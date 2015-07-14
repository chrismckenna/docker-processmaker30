<?php
namespace ProcessMaker\BusinessModel;

use \G;
use \UsersPeer;
use \DepartmentPeer;

/**
 * @author Brayan Pereyra (Cochalo) <brayan@colosa.com>
 * @copyright Colosa - Bolivia
 */
class Department
{
    /**
     * Verify if exists the title of a Department
     *
     * @param string $departmentTitle      Title
     * @param string $departmentUidExclude Unique id of Department to exclude
     *
     * return bool Return true if exists the title of a Department, false otherwise
     */
    public function existsTitle($departmentTitle, $departmentUidExclude = "")
    {
        try {
            $delimiter = \DBAdapter::getStringDelimiter();

            $criteria = new \Criteria("workflow");

            $criteria->addSelectColumn(\DepartmentPeer::DEP_UID);

            $criteria->addAlias("CT", \ContentPeer::TABLE_NAME);

            $arrayCondition = array();
            $arrayCondition[] = array(\DepartmentPeer::DEP_UID, "CT.CON_ID", \Criteria::EQUAL);
            $arrayCondition[] = array("CT.CON_CATEGORY", $delimiter . "DEPO_TITLE" . $delimiter, \Criteria::EQUAL);
            $arrayCondition[] = array("CT.CON_LANG", $delimiter . SYS_LANG . $delimiter, \Criteria::EQUAL);
            $criteria->addJoinMC($arrayCondition, \Criteria::LEFT_JOIN);

            if ($departmentUidExclude != "") {
                $criteria->add(\DepartmentPeer::DEP_UID, $departmentUidExclude, \Criteria::NOT_EQUAL);
            }

            $criteria->add("CT.CON_VALUE", $departmentTitle, \Criteria::EQUAL);

            $rsCriteria = \DepartmentPeer::doSelectRS($criteria);

            return ($rsCriteria->next())? true : false;
        } catch (\Exception $e) {
            throw $e;
        }
    }

    /**
     * Verify if exists the title of a Department
     *
     * @param string $departmentTitle       Title
     * @param string $fieldNameForException Field name for the exception
     * @param string $departmentUidExclude  Unique id of Department to exclude
     *
     * return void Throw exception if exists the title of a Department
     */
    public function throwExceptionIfExistsTitle($departmentTitle, $fieldNameForException, $departmentUidExclude = "")
    {
        try {
            if ($this->existsTitle($departmentTitle, $departmentUidExclude)) {
                throw new \Exception(\G::LoadTranslation("ID_DEPARTMENT_TITLE_ALREADY_EXISTS", array($fieldNameForException, $departmentTitle)));
            }
        } catch (\Exception $e) {
            throw $e;
        }
    }

    /**
     * Get list for Departments
     *
     * @access public
     * @author Brayan Pereyra (Cochalo) <brayan@colosa.com>
     * @copyright Colosa - Bolivia
     *
     * @return array
     */
    public function getDepartments()
    {
        $oDepartment = new \Department();
        $aDepts = $oDepartment->getDepartments('');
        foreach ($aDepts as &$depData) {
            $depData['DEP_CHILDREN'] = $this->getChildren($depData);
            $depData = array_change_key_case($depData, CASE_LOWER);
        }
        return $aDepts;
    }

    /**
     * Get list for Assigned User
     *
     * @access public
     * @author Brayan Pereyra (Cochalo) <brayan@colosa.com>
     * @copyright Colosa - Bolivia
     *
     * @return array
     */
    public function getAssignedUser($dep_uid)
    {
        $dep_uid = Validator::depUid($dep_uid);
        $oDept = new \Department();
        $oDept->Load( $dep_uid );
        $manager = $oDept->getDepManager();
        $oCriteria = new \Criteria( 'workflow' );
        $oCriteria->addSelectColumn( UsersPeer::USR_UID );
        $oCriteria->addSelectColumn( UsersPeer::USR_USERNAME );
        $oCriteria->addSelectColumn( UsersPeer::USR_FIRSTNAME );
        $oCriteria->addSelectColumn( UsersPeer::USR_LASTNAME );
        $oCriteria->addSelectColumn( UsersPeer::USR_STATUS );
        $oCriteria->add( UsersPeer::DEP_UID, '' );
        $oCriteria->add( UsersPeer::USR_STATUS, 'CLOSED', \Criteria::NOT_EQUAL );
        $oCriteria->add( UsersPeer::DEP_UID, $dep_uid );
        $oDataset = UsersPeer::doSelectRS( $oCriteria );
        $oDataset->setFetchmode( \ResultSet::FETCHMODE_ASSOC );
        $aUsers = array ();
        while ($oDataset->next()) {
            $dataTemp = $oDataset->getRow();
            $aUsers[] = array_change_key_case($dataTemp, CASE_LOWER);
            $index = sizeof( $aUsers ) - 1;
            $aUsers[$index]['usr_supervisor'] = ($manager == $aUsers[$index]['usr_uid']) ? true : false;
        }
        return $aUsers;
    }

    /**
     * Get list for Available User
     *
     * @access public
     * @author Brayan Pereyra (Cochalo) <brayan@colosa.com>
     * @copyright Colosa - Bolivia
     *
     * @return array
     */
    public function getAvailableUser($dep_uid, $start = 0, $limit = 0, $search = '')
    {
        $dep_uid = Validator::depUid($dep_uid);

        $start = (int)$start;
        $start = abs($start);
        if ($start != 0) {
            $start+1;
        }

        $limit = (int)$limit;
        $limit = abs($limit);
        if ($limit == 0) {
            $limit = 25;
        } else {
            $limit = (int)$limit;
        }

        $oCriteria = new \Criteria( 'workflow' );
        $oCriteria->addSelectColumn( UsersPeer::USR_UID );
        $oCriteria->addSelectColumn( UsersPeer::USR_USERNAME );
        $oCriteria->addSelectColumn( UsersPeer::USR_FIRSTNAME );
        $oCriteria->addSelectColumn( UsersPeer::USR_LASTNAME );
        $oCriteria->addSelectColumn( UsersPeer::USR_STATUS );
        $oCriteria->add( UsersPeer::DEP_UID, '' );
        $oCriteria->add( UsersPeer::USR_STATUS, 'CLOSED', \Criteria::NOT_EQUAL );

        $oCriteria->setLimit( $limit );
        $oCriteria->setOffset( $start );

        if ($search != '') {
            $oCriteria->add( $oCriteria->getNewCriterion( UsersPeer::USR_USERNAME, '%' . $search . '%', \Criteria::LIKE )->addOr( $oCriteria->getNewCriterion( UsersPeer::USR_FIRSTNAME, '%' . $search . '%', \Criteria::LIKE )->addOr( $oCriteria->getNewCriterion( UsersPeer::USR_LASTNAME, '%' . $search . '%', \Criteria::LIKE ) ) ) );    
        }

        $oDataset = UsersPeer::doSelectRS( $oCriteria );
        $oDataset->setFetchmode( \ResultSet::FETCHMODE_ASSOC );
        $aUsers = array ();
        while ($oDataset->next()) {
            $dataTemp = $oDataset->getRow();
            $aUsers[] = array_change_key_case($dataTemp, CASE_LOWER);
        }
        return $aUsers;
    }

    /**
     * Assign User to Department
     *
     * @param string $departmentUid Unique id of Department
     * @param array  $arrayData     Data
     *
     * return array Return data of the User assigned to Department
     */
    public function assignUser($departmentUid, array $arrayData)
    {
        try {
            //Verify data
            $process = new \ProcessMaker\BusinessModel\Process();
            $validator = new \ProcessMaker\BusinessModel\Validator();

            $validator->throwExceptionIfDataIsNotArray($arrayData, "\$arrayData");
            $validator->throwExceptionIfDataIsEmpty($arrayData, "\$arrayData");

            //Set data
            $arrayData = array_change_key_case($arrayData, CASE_UPPER);

            unset($arrayData["DEP_UID"]);

            //Set variables
            $arrayUserFieldDefinition = array(
                "DEP_UID" => array("type" => "string", "required" => false, "empty" => false, "defaultValues" => array(), "fieldNameAux" => "departmentUid"),
                "USR_UID" => array("type" => "string", "required" => true,  "empty" => false, "defaultValues" => array(), "fieldNameAux" => "userUid")
            );

            $arrayUserFieldNameForException = array(
                "departmentUid" => strtolower("DEP_UID"),
                "userUid"       => strtolower("USR_UID")
            );

            //Verify data
            $departmentUid = \ProcessMaker\BusinessModel\Validator::depUid($departmentUid);

            $process->throwExceptionIfDataNotMetFieldDefinition($arrayData, $arrayUserFieldDefinition, $arrayUserFieldNameForException, true);

            $process->throwExceptionIfNotExistsUser($arrayData["USR_UID"], $arrayUserFieldNameForException["userUid"]);

            //Assign User
            $department = new \Department();

            $department->load($departmentUid);

            $department->addUserToDepartment($departmentUid, $arrayData["USR_UID"], ($department->getDepManager() == "")? true : false, false);
            $department->updateDepartmentManager($departmentUid);

            //Return
            $arrayData = array_merge(array("DEP_UID" => $departmentUid), $arrayData);

            $arrayData = array_change_key_case($arrayData, CASE_LOWER);

            return $arrayData;
        } catch (\Exception $e) {
            throw $e;
        }
    }

    /**
     * Post Unassign User
     *
     * @access public
     * @author Brayan Pereyra (Cochalo) <brayan@colosa.com>
     * @copyright Colosa - Bolivia
     *
     * @return void
     */
    public function unassignUser($dep_uid, $usr_uid)
    {
        $dep_uid = Validator::depUid($dep_uid);
        $usr_uid = Validator::usrUid($usr_uid);

        $dep = new \Department();
        $dep->load( $dep_uid );
        $manager = $dep->getDepManager();
        $dep->removeUserFromDepartment( $dep_uid, $usr_uid );
        if ($usr_uid == $manager) {
            $editDepto['DEP_UID'] = $dep_uid;
            $editDepto['DEP_MANAGER'] = '';
            $dep->update( $editDepto );
            $dep->updateDepartmentManager($dep_uid);
        }
    }

    /**
     * Put Set Manager User
     *
     * @access public
     * @author Brayan Pereyra (Cochalo) <brayan@colosa.com>
     * @copyright Colosa - Bolivia
     *
     * @return void
     */
    public function setManagerUser($dep_uid, $usr_uid)
    {
        $dep_uid = Validator::depUid($dep_uid);
        $usr_uid = Validator::usrUid($usr_uid);

        $oCriteria = new \Criteria( 'workflow' );
        $oCriteria->addSelectColumn( DepartmentPeer::DEP_UID );
        $oCriteria->add( DepartmentPeer::DEP_MANAGER, $usr_uid, \Criteria::EQUAL );

        $oDataset = DepartmentPeer::doSelectRS( $oCriteria );
        $oDataset->setFetchmode( \ResultSet::FETCHMODE_ASSOC );
        if ($oDataset->next()) {
            throw (new \Exception(\G::LoadTranslation("ID_DEPARTMENT_MANAGER_EXIST", array('usr_uid',$usr_uid))));
        }

        $editDepartment['DEP_UID'] = $dep_uid;
        $editDepartment['DEP_MANAGER'] = $usr_uid;
        $oDept = new \Department();
        $oDept->update( $editDepartment );
        $oDept->updateDepartmentManager( $dep_uid );

        $oDept = new \Department();
        $oDept->load($dep_uid);
        $oDept->addUserToDepartment($dep_uid, $usr_uid, ($oDept->getDepManager() == "")? true : false, false);
        $oDept->updateDepartmentManager($dep_uid);
    }

    /**
     * Get list for Departments
     * @var string $dep_uid. Uid for Department
     *
     * @access public
     * @author Brayan Pereyra (Cochalo) <brayan@colosa.com>
     * @copyright Colosa - Bolivia
     *
     * @return array
     */
    public function getDepartment($dep_uid)
    {
        $dep_uid = Validator::depUid($dep_uid);
        $criteria = new \Criteria( 'workflow' );
        $criteria->add( DepartmentPeer::DEP_UID, $dep_uid, \Criteria::EQUAL );
        $con = \Propel::getConnection( DepartmentPeer::DATABASE_NAME );
        $objects = DepartmentPeer::doSelect( $criteria, $con );
        $oUsers = new \Users();

        $node = array ();
        foreach ($objects as $oDepartment) {
            $node['DEP_UID'] = $oDepartment->getDepUid();
            $node['DEP_PARENT'] = $oDepartment->getDepParent();
            $node['DEP_TITLE'] = $oDepartment->getDepTitle();
            $node['DEP_STATUS'] = $oDepartment->getDepStatus();
            $node['DEP_MANAGER'] = $oDepartment->getDepManager();
            $node['DEP_LDAP_DN'] = $oDepartment->getDepLdapDn();
            $node['DEP_LAST'] = 0;

            $manager = $oDepartment->getDepManager();
            if ($manager != '') {
                $UserUID = $oUsers->load($manager);
                $node['DEP_MANAGER_USERNAME'] = isset( $UserUID['USR_USERNAME'] ) ? $UserUID['USR_USERNAME'] : '';
                $node['DEP_MANAGER_FIRSTNAME'] = isset( $UserUID['USR_FIRSTNAME'] ) ? $UserUID['USR_FIRSTNAME'] : '';
                $node['DEP_MANAGER_LASTNAME'] = isset( $UserUID['USR_LASTNAME'] ) ? $UserUID['USR_LASTNAME'] : '';
            } else {
                $node['DEP_MANAGER_USERNAME'] = '';
                $node['DEP_MANAGER_FIRSTNAME'] = '';
                $node['DEP_MANAGER_LASTNAME'] = '';
            }

            $criteria = new \Criteria();
            $criteria->add(UsersPeer::DEP_UID, $dep_uid, \Criteria::EQUAL );
            $node['DEP_MEMBERS'] = UsersPeer::doCount($criteria);

            $criteriaCount = new \Criteria( 'workflow' );
            $criteriaCount->clearSelectColumns();
            $criteriaCount->addSelectColumn( 'COUNT(*)' );
            $criteriaCount->add( DepartmentPeer::DEP_PARENT, $oDepartment->getDepUid(), \Criteria::EQUAL );
            $rs = DepartmentPeer::doSelectRS( $criteriaCount );
            $rs->next();
            $row = $rs->getRow();
            $node['HAS_CHILDREN'] = $row[0];
        }
        $node = array_change_key_case($node, CASE_LOWER);
        return $node;
    }

    /**
     * Save Department
     * @var string $dep_data. Data for Process
     * @var string $create. Flag for create or update
     *
     * @access public
     * @author Brayan Pereyra (Cochalo) <brayan@colosa.com>
     * @copyright Colosa - Bolivia
     *
     * @return array
     */
    public function saveDepartment($dep_data, $create = true)
    {
        Validator::isArray($dep_data, '$dep_data');
        Validator::isNotEmpty($dep_data, '$dep_data');
        Validator::isBoolean($create, '$create');

        $dep_data = array_change_key_case($dep_data, CASE_UPPER);

        if ($create) {
            unset($dep_data["DEP_UID"]);
        }

        $oDepartment = new \Department();
        if (isset($dep_data['DEP_UID']) && $dep_data['DEP_UID'] != '') {
            Validator::depUid($dep_data['DEP_UID']);
        }
        if (isset($dep_data['DEP_PARENT']) && $dep_data['DEP_PARENT'] != '') {
            Validator::depUid($dep_data['DEP_PARENT'], 'dep_parent');
        }
        if (isset($dep_data['DEP_MANAGER']) && $dep_data['DEP_MANAGER'] != '') {
            Validator::usrUid($dep_data['DEP_MANAGER'], 'dep_manager');
        }
        if (isset($dep_data['DEP_STATUS'])) {
            Validator::depStatus($dep_data['DEP_STATUS']);
        }

        if (!$create) {
            if (isset($dep_data["DEP_TITLE"])) {
                $this->throwExceptionIfExistsTitle($dep_data["DEP_TITLE"], strtolower("DEP_TITLE"), $dep_data["DEP_UID"]);

                $dep_data["DEPO_TITLE"] = $dep_data["DEP_TITLE"];
            }

            $oDepartment->update($dep_data);
            $oDepartment->updateDepartmentManager($dep_data['DEP_UID']);
        } else {
            if (isset($dep_data['DEP_TITLE'])) {
                $this->throwExceptionIfExistsTitle($dep_data["DEP_TITLE"], strtolower("DEP_TITLE"));
            } else {
                throw (new \Exception(\G::LoadTranslation("ID_FIELD_REQUIRED", array('dep_title'))));
            }

            $dep_uid = $oDepartment->create($dep_data);
            $response = $this->getDepartment($dep_uid);
            return $response;
        }
    }

    /**
     * Delete department
     * @var string $dep_uid. Uid for department
     *
     * @access public
     * @author Brayan Pereyra (Cochalo) <brayan@colosa.com>
     * @copyright Colosa - Bolivia
     *
     * @return array
     */
    public function deleteDepartment($dep_uid)
    {
        $dep_uid = Validator::depUid($dep_uid);
        $oDepartment = new \Department();
        $countUsers = $oDepartment->cantUsersInDepartment($dep_uid);
        if ($countUsers != 0) {
            throw (new \Exception(\G::LoadTranslation("ID_CANT_DELETE_DEPARTMENT_HAS_USERS")));
        }
        $dep_data = $this->getDepartment($dep_uid);
        if ($dep_data['has_children'] != 0) {
            throw (new \Exception(\G::LoadTranslation("ID_CANT_DELETE_DEPARTMENT_HAS_CHILDREN")));
        }
        $oDepartment->remove($dep_uid);
    }

    /**
     * Look for Children for department
     * @var array $dataDep. Data for child department
     *
     * @access public
     * @author Brayan Pereyra (Cochalo) <brayan@colosa.com>
     * @copyright Colosa - Bolivia
     *
     * @return array
     */
    protected function getChildren ($dataDep)
    {
        $children = array();
        if ((int)$dataDep['HAS_CHILDREN'] > 0) {
            $oDepartment = new \Department();
            $aDepts = $oDepartment->getDepartments($dataDep['DEP_UID']);
            foreach ($aDepts as &$depData) {
                $depData['DEP_CHILDREN'] = $this->getChildren($depData);
                $depData = array_change_key_case($depData, CASE_LOWER);
                $children[] = $depData;
            }
        }
        return $children;
    }
}

