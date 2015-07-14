<?php

require_once 'propel/map/MapBuilder.php';
include_once 'creole/CreoleTypes.php';


/**
 * This class adds structure of 'BPMN_DATA' table to 'workflow' DatabaseMap object.
 *
 *
 *
 * These statically-built map classes are used by Propel to do runtime db structure discovery.
 * For example, the createSelectSql() method checks the type of a given column used in an
 * ORDER BY clause to know whether it needs to apply SQL to make the ORDER BY case-insensitive
 * (i.e. if it's a text column type).
 *
 * @package    workflow.classes.model.map
 */
class BpmnDataMapBuilder
{

    /**
     * The (dot-path) name of this class
     */
    const CLASS_NAME = 'classes.model.map.BpmnDataMapBuilder';

    /**
     * The database map.
     */
    private $dbMap;

    /**
     * Tells us if this DatabaseMapBuilder is built so that we
     * don't have to re-build it every time.
     *
     * @return     boolean true if this DatabaseMapBuilder is built, false otherwise.
     */
    public function isBuilt()
    {
        return ($this->dbMap !== null);
    }

    /**
     * Gets the databasemap this map builder built.
     *
     * @return     the databasemap
     */
    public function getDatabaseMap()
    {
        return $this->dbMap;
    }

    /**
     * The doBuild() method builds the DatabaseMap
     *
     * @return     void
     * @throws     PropelException
     */
    public function doBuild()
    {
        $this->dbMap = Propel::getDatabaseMap('workflow');

        $tMap = $this->dbMap->addTable('BPMN_DATA');
        $tMap->setPhpName('BpmnData');

        $tMap->setUseIdGenerator(false);

        $tMap->addPrimaryKey('DAT_UID', 'DatUid', 'string', CreoleTypes::VARCHAR, true, 32);

        $tMap->addForeignKey('PRJ_UID', 'PrjUid', 'string', CreoleTypes::VARCHAR, 'BPMN_PROJECT', 'PRJ_UID', true, 32);

        $tMap->addForeignKey('PRO_UID', 'ProUid', 'string', CreoleTypes::VARCHAR, 'BPMN_PROCESS', 'PRO_UID', false, 32);

        $tMap->addColumn('DAT_NAME', 'DatName', 'string', CreoleTypes::VARCHAR, false, 255);

        $tMap->addColumn('DAT_TYPE', 'DatType', 'string', CreoleTypes::VARCHAR, true, 20);

        $tMap->addColumn('DAT_IS_COLLECTION', 'DatIsCollection', 'int', CreoleTypes::TINYINT, false, null);

        $tMap->addColumn('DAT_ITEM_KIND', 'DatItemKind', 'string', CreoleTypes::VARCHAR, true, 20);

        $tMap->addColumn('DAT_CAPACITY', 'DatCapacity', 'int', CreoleTypes::INTEGER, false, null);

        $tMap->addColumn('DAT_IS_UNLIMITED', 'DatIsUnlimited', 'int', CreoleTypes::TINYINT, false, null);

        $tMap->addColumn('DAT_STATE', 'DatState', 'string', CreoleTypes::VARCHAR, false, 255);

        $tMap->addColumn('DAT_IS_GLOBAL', 'DatIsGlobal', 'int', CreoleTypes::TINYINT, false, null);

        $tMap->addColumn('DAT_OBJECT_REF', 'DatObjectRef', 'string', CreoleTypes::VARCHAR, false, 32);

    } // doBuild()

} // BpmnDataMapBuilder
