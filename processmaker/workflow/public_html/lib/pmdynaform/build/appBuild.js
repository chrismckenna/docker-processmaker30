window.onload = function () {
    var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
        lineNumbers: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        mode: "application/ld+json",
        viewportMargin: Infinity
    });
    editor.setSize(350, 500);
    document.getElementById("file").onchange = function (e) {
        var r = new FileReader();
        r.readAsText(this.files[0], "UTF-8");
        r.onload = function (e) {
            editor.setValue(e.target.result);
            $(".pmdynaform-container").remove();
        };
        this.form.reset();
    };
    $(".CodeMirror").hide();
    document.getElementById("test").onclick = function () {
        $(".pmdynaform-container").remove();
        window.project = new PMDynaform.core.Project({
            data: data, //JSON.parse(editor.getValue()),
            renderTo: document.getElementById("container"),
            submitRest: true,
            keys: {
                server: "http://richard3.pmos.colosa.net/", //"http://michelangelo.pmos3.colosa.net/",
                projectId: "77897681255201470a0f0d7004942598", //"25084755253f3a016907523058545566",
                workspace: "richard3" //"workflow3"
            },
            token: {
                accessToken: "36dd96e54997032ca76ea316bcb861cef507f807" //"db0498b53483bb840e996a27d23ace1d49f1e35b"
            },
            renderTo: document.body
        });
        $(".pmdynaform-container").css({
            "float":"left",
            "width" : "100%"
        });
    };
    document.getElementById("format").onclick = function () {
        var a = editor.getCursor(true);
        var b = editor.getCursor(false);
        if (a === b) {
            a = {line: 0, ch: 0};
            b = {line: editor.doc.lastLine(), ch: editor.getValue().length};
        }
        editor.autoFormatRange(a, b);
    };

    document.getElementById("desktop").onclick = function () {
        $(".pmdynaform-container").css({"width": "1024px","float" : "left"});
    };
    document.getElementById("tablet").onclick = function () {
        $(".pmdynaform-container").css({"width": "800px", "float" : "left"});
    };
    document.getElementById("smartphone").onclick = function () {
        $(".pmdynaform-container").css({"width": "400px","float" : "left"});
    };
};

data = {
  "name": "single_string_text",
  "description": "",
  "items": [
    {
    "type": "form",
    "skyn" : "default", //default primary success info warning danger
    "id": "229723097555a11781ed309062592560",
    "name": "single_string_text",
    "description": "",
    "mode": "edit",
    "script": "",
    "language": "en",
    "externalLibs": "",
    "items": [
      [{
        "type" : "title",
        "label" : "My Title"
      }],
      [
      {
      "type": "text",
      "variable": "single_string1",
      "dataType": "string",
      "id": "single_string1",
      "name": "single_string1",
      "label": "text_1",
      "defaultValue": "",
      "placeholder": "",
      "hint": "",
      "required": false,
      "dependentFields": [],
      "textTransform": "none",
      "validate": "",
      "validateMessage": "",
      "maxLength": 1000,
      "formula": "",
      "mode": "parent",
      "operation": "",
      "dbConnection": "workflow",
      "dbConnectionLabel": "PM Database",
      "sql": "",
      "options": [],
      "var_uid": "873219556555a11648046f8072320954",
      "var_name": "single_string1",
      "colSpan": 12,
      "data": {
        "value": "aaa",
        "label": "aaa"
      }
    }],
    [{
      "type": "textarea",
      "variable": "single_string2",
      "dataType": "string",
      "id": "single_string2",
      "name": "single_string2",
      "label": "textarea_1",
      "defaultValue": "",
      "placeholder": "",
      "hint": "",
      "required": false,
      "validate": "",
      "validateMessage": "",
      "mode": "parent",
      "dbConnection": "workflow",
      "dbConnectionLabel": "PM Database",
      "sql": "",
      "options": [],
      "var_uid": "722328203555a310a0e4681013044088",
      "var_name": "single_string2",
      "colSpan": 12,
      "data": {
        "value": "aaaaa",
        "label": "aaaaa"
      }
    }],
    [{
      "type": "dropdown",
      "variable": "options1_string",
      "dataType": "string",
      "id": "options1_string",
      "name": "options1_string",
      "label": "dropdown_1",
      "defaultValue": "",
      "hint": "",
      "required": false,
      "dependentFields": [],
      "mode": "parent",
      "dbConnection": "workflow",
      "dbConnectionLabel": "PM Database",
      "sql": "SELECT IC_UID, IC_NAME FROM ISO_COUNTRY",
      "options": [
        {
          "label": "Andorra",
          "value": "AD"
        },
        {
          "label": "United Arab Emirates",
          "value": "AE"
        },
        {
          "label": "Afghanistan",
          "value": "AF"
        },
        {
          "label": "Antigua and Barbuda",
          "value": "AG"
        },
        {
          "label": "Anguilla",
          "value": "AI"
        },
        {
          "label": "Albania",
          "value": "AL"
        },
        {
          "label": "Armenia",
          "value": "AM"
        },
        {
          "label": "Netherlands Antilles",
          "value": "AN"
        },
        {
          "label": "Angola",
          "value": "AO"
        },
        {
          "label": "Antarctica",
          "value": "AQ"
        },
        {
          "label": "Argentina",
          "value": "AR"
        },
        {
          "label": "American Samoa",
          "value": "AS"
        },
        {
          "label": "Austria",
          "value": "AT"
        },
        {
          "label": "Australia",
          "value": "AU"
        },
        {
          "label": "Aruba",
          "value": "AW"
        },
        {
          "label": "Azerbaijan",
          "value": "AZ"
        },
        {
          "label": "Bosnia and Herzegovina",
          "value": "BA"
        },
        {
          "label": "Barbados",
          "value": "BB"
        },
        {
          "label": "Bangladesh",
          "value": "BD"
        },
        {
          "label": "Belgium",
          "value": "BE"
        },
        {
          "label": "Burkina Faso",
          "value": "BF"
        },
        {
          "label": "Bulgaria",
          "value": "BG"
        },
        {
          "label": "Bahrain",
          "value": "BH"
        },
        {
          "label": "Burundi",
          "value": "BI"
        },
        {
          "label": "Benin",
          "value": "BJ"
        },
        {
          "label": "Bermuda",
          "value": "BM"
        },
        {
          "label": "Brunei Darussalam",
          "value": "BN"
        },
        {
          "label": "Bolivia",
          "value": "BO"
        },
        {
          "label": "Brazil",
          "value": "BR"
        },
        {
          "label": "Bahamas",
          "value": "BS"
        },
        {
          "label": "Bhutan",
          "value": "BT"
        },
        {
          "label": "Botswana",
          "value": "BW"
        },
        {
          "label": "Belarus",
          "value": "BY"
        },
        {
          "label": "Belize",
          "value": "BZ"
        },
        {
          "label": "Canada",
          "value": "CA"
        },
        {
          "label": "Cocos (Keeling) Islands",
          "value": "CC"
        },
        {
          "label": "Congo, The Democratic Republic of the",
          "value": "CD"
        },
        {
          "label": "Central African Republic",
          "value": "CF"
        },
        {
          "label": "Congo",
          "value": "CG"
        },
        {
          "label": "Switzerland",
          "value": "CH"
        },
        {
          "label": "Cote-d' lvoire",
          "value": "CI"
        },
        {
          "label": "Cook Islands",
          "value": "CK"
        },
        {
          "label": "Chile",
          "value": "CL"
        },
        {
          "label": "Cameroon",
          "value": "CM"
        },
        {
          "label": "China",
          "value": "CN"
        },
        {
          "label": "Colombia",
          "value": "CO"
        },
        {
          "label": "Costa Rica",
          "value": "CR"
        },
        {
          "label": "Serbia and Montenegro",
          "value": "CS"
        },
        {
          "label": "Cuba",
          "value": "CU"
        },
        {
          "label": "Cape Verde",
          "value": "CV"
        },
        {
          "label": "Christmas Island",
          "value": "CX"
        },
        {
          "label": "Cyprus",
          "value": "CY"
        },
        {
          "label": "Czech Republic",
          "value": "CZ"
        },
        {
          "label": "Germany",
          "value": "DE"
        },
        {
          "label": "Djibouti",
          "value": "DJ"
        },
        {
          "label": "Denmark",
          "value": "DK"
        },
        {
          "label": "Dominica",
          "value": "DM"
        },
        {
          "label": "Dominican Republic",
          "value": "DO"
        },
        {
          "label": "Algeria",
          "value": "DZ"
        },
        {
          "label": "Ecuador",
          "value": "EC"
        },
        {
          "label": "Estonia",
          "value": "EE"
        },
        {
          "label": "Egypt",
          "value": "EG"
        },
        {
          "label": "Western Sahara",
          "value": "EH"
        },
        {
          "label": "Eritrea",
          "value": "ER"
        },
        {
          "label": "Spain",
          "value": "ES"
        },
        {
          "label": "Ethiopia",
          "value": "ET"
        },
        {
          "label": "Finland",
          "value": "FI"
        },
        {
          "label": "Fiji",
          "value": "FJ"
        },
        {
          "label": "Falkland Islands (Malvinas)",
          "value": "FK"
        },
        {
          "label": "Micronesia, Federated States of",
          "value": "FM"
        },
        {
          "label": "Faroe Islands",
          "value": "FO"
        },
        {
          "label": "France",
          "value": "FR"
        },
        {
          "label": "Gabon",
          "value": "GA"
        },
        {
          "label": "United Kingdom",
          "value": "GB"
        },
        {
          "label": "Grenada",
          "value": "GD"
        },
        {
          "label": "Georgia",
          "value": "GE"
        },
        {
          "label": "French Guiana",
          "value": "GF"
        },
        {
          "label": "Guernsey",
          "value": "GG"
        },
        {
          "label": "Ghana",
          "value": "GH"
        },
        {
          "label": "Gibraltar",
          "value": "GI"
        },
        {
          "label": "Greenland",
          "value": "GL"
        },
        {
          "label": "Gambia",
          "value": "GM"
        },
        {
          "label": "Guinea",
          "value": "GN"
        },
        {
          "label": "Guadeloupe",
          "value": "GP"
        },
        {
          "label": "Equatorial Guinea",
          "value": "GQ"
        },
        {
          "label": "Greece",
          "value": "GR"
        },
        {
          "label": "South Georgia and the South Sandwich Islands",
          "value": "GS"
        },
        {
          "label": "Guatemala",
          "value": "GT"
        },
        {
          "label": "Guam",
          "value": "GU"
        },
        {
          "label": "Guinea-Bissau",
          "value": "GW"
        },
        {
          "label": "Guyana",
          "value": "GY"
        },
        {
          "label": "Hong Kong",
          "value": "HK"
        },
        {
          "label": "Heard Island and McDonald Islands",
          "value": "HM"
        },
        {
          "label": "Honduras",
          "value": "HN"
        },
        {
          "label": "Croatia",
          "value": "HR"
        },
        {
          "label": "Haiti",
          "value": "HT"
        },
        {
          "label": "Hungary",
          "value": "HU"
        },
        {
          "label": "Indonesia",
          "value": "ID"
        },
        {
          "label": "Ireland",
          "value": "IE"
        },
        {
          "label": "Israel",
          "value": "IL"
        },
        {
          "label": "Isle of Man",
          "value": "IM"
        },
        {
          "label": "India",
          "value": "IN"
        },
        {
          "label": "British Indian Ocean Territory",
          "value": "IO"
        },
        {
          "label": "Iraq",
          "value": "IQ"
        },
        {
          "label": "Iran, Islamic Republic of",
          "value": "IR"
        },
        {
          "label": "Iceland",
          "value": "IS"
        },
        {
          "label": "Italy",
          "value": "IT"
        },
        {
          "label": "Jersey",
          "value": "JE"
        },
        {
          "label": "Jamaica",
          "value": "JM"
        },
        {
          "label": "Jordan",
          "value": "JO"
        },
        {
          "label": "Japan",
          "value": "JP"
        },
        {
          "label": "Kenya",
          "value": "KE"
        },
        {
          "label": "Kyrgyzstan",
          "value": "KG"
        },
        {
          "label": "Cambodia",
          "value": "KH"
        },
        {
          "label": "Kiribati",
          "value": "KI"
        },
        {
          "label": "Comoros",
          "value": "KM"
        },
        {
          "label": "Saint Kitts and Nevis",
          "value": "KN"
        },
        {
          "label": "Korea, Democratic People's Republic of",
          "value": "KP"
        },
        {
          "label": "Korea, Republic of",
          "value": "KR"
        },
        {
          "label": "Kuwait",
          "value": "KW"
        },
        {
          "label": "Cayman Islands",
          "value": "KY"
        },
        {
          "label": "Kazakhstan",
          "value": "KZ"
        },
        {
          "label": "Lao People's Democratic Republic",
          "value": "LA"
        },
        {
          "label": "Lebanon",
          "value": "LB"
        },
        {
          "label": "Saint Lucia",
          "value": "LC"
        },
        {
          "label": "Liechtenstein",
          "value": "LI"
        },
        {
          "label": "Sri Lanka",
          "value": "LK"
        },
        {
          "label": "Liberia",
          "value": "LR"
        },
        {
          "label": "Lesotho",
          "value": "LS"
        },
        {
          "label": "Lithuania",
          "value": "LT"
        },
        {
          "label": "Luxembourg",
          "value": "LU"
        },
        {
          "label": "Latvia",
          "value": "LV"
        },
        {
          "label": "Libyan Arab Jamahiriya",
          "value": "LY"
        },
        {
          "label": "Morocco",
          "value": "MA"
        },
        {
          "label": "Monaco",
          "value": "MC"
        },
        {
          "label": "Moldova, Republic of",
          "value": "MD"
        },
        {
          "label": "Montenegro",
          "value": "ME"
        },
        {
          "label": "Madagascar",
          "value": "MG"
        },
        {
          "label": "Marshall Islands",
          "value": "MH"
        },
        {
          "label": "Macedonia, The former Yugoslav Republic of",
          "value": "MK"
        },
        {
          "label": "Mali",
          "value": "ML"
        },
        {
          "label": "Myanmar",
          "value": "MM"
        },
        {
          "label": "Mongolia",
          "value": "MN"
        },
        {
          "label": "Macao",
          "value": "MO"
        },
        {
          "label": "Northern Mariana Islands",
          "value": "MP"
        },
        {
          "label": "Martinique",
          "value": "MQ"
        },
        {
          "label": "Mauritania",
          "value": "MR"
        },
        {
          "label": "Montserrat",
          "value": "MS"
        },
        {
          "label": "Malta",
          "value": "MT"
        },
        {
          "label": "Mauritius",
          "value": "MU"
        },
        {
          "label": "Maldives",
          "value": "MV"
        },
        {
          "label": "Malawi",
          "value": "MW"
        },
        {
          "label": "Mexico",
          "value": "MX"
        },
        {
          "label": "Malaysia",
          "value": "MY"
        },
        {
          "label": "Mozambique",
          "value": "MZ"
        },
        {
          "label": "Namibia",
          "value": "NA"
        },
        {
          "label": "New Caledonia",
          "value": "NC"
        },
        {
          "label": "Niger",
          "value": "NE"
        },
        {
          "label": "Norfolk Island",
          "value": "NF"
        },
        {
          "label": "Nigeria",
          "value": "NG"
        },
        {
          "label": "Nicaragua",
          "value": "NI"
        },
        {
          "label": "Netherlands",
          "value": "NL"
        },
        {
          "label": "Norway",
          "value": "NO"
        },
        {
          "label": "Nepal",
          "value": "NP"
        },
        {
          "label": "Nauru",
          "value": "NR"
        },
        {
          "label": "Niue",
          "value": "NU"
        },
        {
          "label": "New Zealand",
          "value": "NZ"
        },
        {
          "label": "Oman",
          "value": "OM"
        },
        {
          "label": "Panama",
          "value": "PA"
        },
        {
          "label": "Peru",
          "value": "PE"
        },
        {
          "label": "French Polynesia",
          "value": "PF"
        },
        {
          "label": "Papua New Guinea",
          "value": "PG"
        },
        {
          "label": "Philippines",
          "value": "PH"
        },
        {
          "label": "Pakistan",
          "value": "PK"
        },
        {
          "label": "Poland",
          "value": "PL"
        },
        {
          "label": "Saint Pierre and Miquelon",
          "value": "PM"
        },
        {
          "label": "Pitcairn",
          "value": "PN"
        },
        {
          "label": "Puerto Rico",
          "value": "PR"
        },
        {
          "label": "Portugal",
          "value": "PT"
        },
        {
          "label": "Palau",
          "value": "PW"
        },
        {
          "label": "Paraguay",
          "value": "PY"
        },
        {
          "label": "Qatar",
          "value": "QA"
        },
        {
          "label": "Reunion",
          "value": "RE"
        },
        {
          "label": "Romania",
          "value": "RO"
        },
        {
          "label": "Serbia",
          "value": "RS"
        },
        {
          "label": "Russian Federation",
          "value": "RU"
        },
        {
          "label": "Rwanda",
          "value": "RW"
        },
        {
          "label": "Saudi Arabia",
          "value": "SA"
        },
        {
          "label": "Solomon Islands",
          "value": "SB"
        },
        {
          "label": "Seychelles",
          "value": "SC"
        },
        {
          "label": "Sudan",
          "value": "SD"
        },
        {
          "label": "Sweden",
          "value": "SE"
        },
        {
          "label": "Singapore",
          "value": "SG"
        },
        {
          "label": "Saint Helena",
          "value": "SH"
        },
        {
          "label": "Slovenia",
          "value": "SI"
        },
        {
          "label": "Svalbard and Jan Mayen",
          "value": "SJ"
        },
        {
          "label": "Slovakia",
          "value": "SK"
        },
        {
          "label": "Sierra Leone",
          "value": "SL"
        },
        {
          "label": "San Marino",
          "value": "SM"
        },
        {
          "label": "Senegal",
          "value": "SN"
        },
        {
          "label": "Somalia",
          "value": "SO"
        },
        {
          "label": "Suriname",
          "value": "SR"
        },
        {
          "label": "Sao Tome and Principe",
          "value": "ST"
        },
        {
          "label": "El Salvador",
          "value": "SV"
        },
        {
          "label": "Syrian Arab Republic",
          "value": "SY"
        },
        {
          "label": "Swaziland",
          "value": "SZ"
        },
        {
          "label": "Turks and Caicos Islands",
          "value": "TC"
        },
        {
          "label": "Chad",
          "value": "TD"
        },
        {
          "label": "French Southern Territories",
          "value": "TF"
        },
        {
          "label": "Togo",
          "value": "TG"
        },
        {
          "label": "Thailand",
          "value": "TH"
        },
        {
          "label": "Tajikistan",
          "value": "TJ"
        },
        {
          "label": "Tokelau",
          "value": "TK"
        },
        {
          "label": "Timor-Leste",
          "value": "TL"
        },
        {
          "label": "Turkmenistan",
          "value": "TM"
        },
        {
          "label": "Tunisia",
          "value": "TN"
        },
        {
          "label": "Tonga",
          "value": "TO"
        },
        {
          "label": "Turkey",
          "value": "TR"
        },
        {
          "label": "Trinidad and Tobago",
          "value": "TT"
        },
        {
          "label": "Tuvalu",
          "value": "TV"
        },
        {
          "label": "Taiwan, Province of China",
          "value": "TW"
        },
        {
          "label": "Tanzania, United Republic of",
          "value": "TZ"
        },
        {
          "label": "Ukraine",
          "value": "UA"
        },
        {
          "label": "Uganda",
          "value": "UG"
        },
        {
          "label": "United States Minor Outlying Islands",
          "value": "UM"
        },
        {
          "label": "United States",
          "value": "US"
        },
        {
          "label": "Uruguay",
          "value": "UY"
        },
        {
          "label": "Uzbekistan",
          "value": "UZ"
        },
        {
          "label": "Holy See (Vatican City State)",
          "value": "VA"
        },
        {
          "label": "Saint Vincent and the Grenadines",
          "value": "VC"
        },
        {
          "label": "Venezuela",
          "value": "VE"
        },
        {
          "label": "Virgin Islands, British",
          "value": "VG"
        },
        {
          "label": "Virgin Islands, U.S.",
          "value": "VI"
        },
        {
          "label": "Viet Nam",
          "value": "VN"
        },
        {
          "label": "Vanuatu",
          "value": "VU"
        },
        {
          "label": "Wallis and Futuna",
          "value": "WF"
        },
        {
          "label": "Samoa",
          "value": "WS"
        },
        {
          "label": "Installations in International Waters",
          "value": "XZ"
        },
        {
          "label": "Yemen",
          "value": "YE"
        },
        {
          "label": "Mayotte",
          "value": "YT"
        },
        {
          "label": "South Africa",
          "value": "ZA"
        },
        {
          "label": "Zambia",
          "value": "ZM"
        },
        {
          "label": "Zimbabwe",
          "value": "ZW"
        }
      ],
      "var_uid": "824867629555a325c3634b0059874149",
      "var_name": "options1_string",
      "colSpan": 12,
      "data": {
        "value": "AR",
        "label": "Argentina"
      }
    }],
    [{
      "type": "checkbox",
      "variable": "options2_string",
      "dataType": "string",
      "id": "options2_string",
      "name": "options2_string",
      "label": "checkbox_1",
      "defaultValue": "",
      "hint": "",
      "required": false,
      "mode": "parent",
      "dbConnection": "workflow",
      "dbConnectionLabel": "PM Database",
      "sql": "",
      "options": [{
        "value": "uno",
        "label": "var_1"
      },
      {
        "value": "dos",
        "label": "var_2"
      },
      {
        "value": "tres",
        "label": "var_3"
      },
      {
        "value": "cuatro",
        "label": "var_4"
      },
      {
        "value": "cinco",
        "label": "var_5"
      }],
      "var_uid": "396463705555b34b3c20588012364208",
      "var_name": "options2_string",
      "colSpan": 12,
      "data": {
        "value": ["tres",
        "cinco"],
        "label": "[\"tres\",\"cinco\"]"
      }
    }],
    [{
      "type": "checkbox",
      "variable": "boolean1",
      "dataType": "boolean",
      "id": "boolean1",
      "name": "boolean1",
      "label": "checkbox_boolean",
      "defaultValue": "",
      "hint": "",
      "required": false,
      "mode": "parent",
      "dbConnection": "workflow",
      "dbConnectionLabel": "PM Database",
      "sql": "",
      "options": [{
        "value": "1",
        "label": "verdad"
      },
      {
        "value": "0",
        "label": "falso"
      }],
      "var_uid": "967190937555b3fc268f5e1077618654",
      "var_name": "boolean1",
      "colSpan": 12,
      "data": {
        "value": ["1"],
        "label": "[\"1\"]"
      }
    }],
    [{
      "type": "radio",
      "variable": "options3",
      "dataType": "string",
      "id": "options3",
      "name": "options3",
      "label": "radio_1",
      "defaultValue": "",
      "hint": "",
      "required": false,
      "mode": "parent",
      "dbConnection": "workflow",
      "dbConnectionLabel": "PM Database",
      "sql": "",
      "options": [{
        "value": "opt1",
        "label": "option1"
      },
      {
        "value": "opt2",
        "label": "option2"
      },
      {
        "value": "opt3",
        "label": "option3"
      },
      {
        "value": "opt4",
        "label": "option4"
      }],
      "var_uid": "995155804555b47accdcbf6058244129",
      "var_name": "options3",
      "colSpan": 12,
      "data": {
        "value": "opt2",
        "label": "option2"
      }
    }],
    [{
      "type": "submit",
      "id": "submit0000000001",
      "name": "submit0000000001",
      "label": "submit_1",
      "colSpan": 12
    }]],
    "variables": [{
      "var_uid": "873219556555a11648046f8072320954",
      "prj_uid": "498574572555a0fa9474b40040026428",
      "var_name": "single_string1",
      "var_field_type": "string",
      "var_field_size": 10,
      "var_label": "string",
      "var_dbconnection": "workflow",
      "var_dbconnection_label": "PM Database",
      "var_sql": "",
      "var_null": 0,
      "var_default": "",
      "var_accepted_values": "[]"
    },
    {
      "var_uid": "722328203555a310a0e4681013044088",
      "prj_uid": "498574572555a0fa9474b40040026428",
      "var_name": "single_string2",
      "var_field_type": "string",
      "var_field_size": 10,
      "var_label": "string",
      "var_dbconnection": "workflow",
      "var_dbconnection_label": "PM Database",
      "var_sql": "",
      "var_null": 0,
      "var_default": "",
      "var_accepted_values": "[]"
    },
    {
      "var_uid": "824867629555a325c3634b0059874149",
      "prj_uid": "498574572555a0fa9474b40040026428",
      "var_name": "options1_string",
      "var_field_type": "string",
      "var_field_size": 10,
      "var_label": "string",
      "var_dbconnection": "workflow",
      "var_dbconnection_label": "PM Database",
      "var_sql": "SELECT IC_UID, IC_NAME FROM ISO_COUNTRY",
      "var_null": 0,
      "var_default": "",
      "var_accepted_values": "[]"
    },
    {
      "var_uid": "396463705555b34b3c20588012364208",
      "prj_uid": "498574572555a0fa9474b40040026428",
      "var_name": "options2_string",
      "var_field_type": "string",
      "var_field_size": 10,
      "var_label": "string",
      "var_dbconnection": "workflow",
      "var_dbconnection_label": "PM Database",
      "var_sql": "",
      "var_null": 0,
      "var_default": "",
      "var_accepted_values": "[{\"value\":\"uno\",\"label\":\"var_1\"},{\"value\":\"dos\",\"label\":\"var_2\"},{\"value\":\"tres\",\"label\":\"var_3\"},{\"value\":\"cuatro\",\"label\":\"var_4\"},{\"value\":\"cinco\",\"label\":\"var_5\"}]"
    },
    {
      "var_uid": "967190937555b3fc268f5e1077618654",
      "prj_uid": "498574572555a0fa9474b40040026428",
      "var_name": "boolean1",
      "var_field_type": "boolean",
      "var_field_size": 10,
      "var_label": "boolean",
      "var_dbconnection": "workflow",
      "var_dbconnection_label": "PM Database",
      "var_sql": "",
      "var_null": 0,
      "var_default": "",
      "var_accepted_values": "[{\"value\":\"1\",\"label\":\"verdad\"},{\"value\":\"0\",\"label\":\"falso\"}]"
    },
    {
      "var_uid": "995155804555b47accdcbf6058244129",
      "prj_uid": "498574572555a0fa9474b40040026428",
      "var_name": "options3",
      "var_field_type": "string",
      "var_field_size": 10,
      "var_label": "string",
      "var_dbconnection": "workflow",
      "var_dbconnection_label": "PM Database",
      "var_sql": "",
      "var_null": 0,
      "var_default": "",
      "var_accepted_values": "[{\"value\":\"opt1\",\"label\":\"option1\"},{\"value\":\"opt2\",\"label\":\"option2\"},{\"value\":\"opt3\",\"label\":\"option3\"},{\"value\":\"opt4\",\"label\":\"option4\"}]"
    }]
  }]
}