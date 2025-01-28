{
  "openapi": "3.1.0",
  "info": {
    "title": "URM Public REST APIs",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "http://user-request-management"
    }
  ],
  "paths": {
    "/user-requests/{guid}": {
      "get": {
        "summary": "RetrieveUserRequest",
        "description": "Get the user request with the given guid",
        "parameters": [
          {
            "name": "followUp",
            "in": "query",
            "description": "Retrieve programming order requests level informations.",
            "default": false,
            "schema": {
              "type": "boolean"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "The User request retrieved",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/getUserRequestDetailsResponse"
                }
              }
            }
          },
          "400": {
            "description": "Bad request. The request body does not match the schema"
          },
          "404": {
            "description": "Not found. The user request with the given guid does not exist"
          }
        }
      },
      "delete": {
        "summary": "CancelUserRequest",
        "description": "Cancel the given user request with the given guid and cancel the associated Programming request in mission chains",
        "responses": {
          "200": {
            "description": "The User request has been cancelled"
          },
          "400": {
            "description": "Bad request. The request body does not match the schema"
          },
          "404": {
            "description": "Not found. The user request with the given guid does not exist"
          }
        }
      },
      "parameters": [
        {
          "name": "guid",
          "in": "path",
          "description": "The user request guid to request",
          "required": true,
          "schema": {
            "type": "string"
          }
        }
      ]
    },
    "/user-requests": {
      "post": {
        "summary": "SubmitUserRequest",
        "description": "Submit the given user request. In all cases the User Request is stored and depending on the Coverage service configuration the user request is dispatched in Programming requests and the Programming requests are activated in mission chains. The MESHING_SUBDIVISION and EVOLVING_MESHING_SUBDIVISION configurations require the User Request to be ANALYZED (status in ANALYZED and acquisitions with dated DTOs are available)",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/submitUserRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "The submitted User request",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/userRequestSubmitted"
                }
              }
            }
          },
          "400": {
            "description": "Bad request. The request body does not match the schema"
          }
        }
      },
      "patch": {
        "summary": "UpdateUserRequest",
        "description": "Update the given user request",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/udateProgrammingRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "The updated User request",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/userRequestSubmitted"
                }
              }
            }
          },
          "400": {
            "description": "Bad request. The request body does not match the schema"
          },
          "403": {
            "description": "Forbidden. The user request can not be updated. It is not authorized to update the requested fields"
          }
        }
      },
      "get": {
        "summary": "RetrieveUserRequests",
        "description": "Get all user requests",
        "responses": {
          "200": {
            "description": "A User request list",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/getUserRequestsResponse"
                }
              }
            }
          },
          "400": {
            "description": "Bad request. The request body does not match the schema"
          }
        }
      }
    },
    "/user-requests/analysis": {
      "post": {
        "summary": "LaunchAnalysis",
        "description": "Request the analysis for the given user request. Compute the geo split and accesses without submitting the request",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/analyzeUserRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "The user request with geo split and accesses computed without submission",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/userRequestAnalyzed"
                }
              }
            }
          },
          "400": {
            "description": "Bad request. The request body does not match the schema"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "analyzeUserRequest": {
        "$id": "AnalyzeUserRequest.json",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "additionalProperties": false,
        "title": "AnalyzeUserRequest object definition",
        "type": "object",
        "properties": {
          "externalId": {
            "description": "Extern ID\nEmpty for internal user request",
            "type": "string",
            "pattern": "^[A-Za-z0-9 !\\\"#$%&'*+,-./:;<=>?@^_`(|)~]{1,500}$"
          },
          "status": {
            "description": "The User request status",
            "type": "string",
            "enum": [
              "CREATED",
              "ANALYZED",
              "ACTIVATED",
              "COMPLETED",
              "CANCELLED"
            ]
          },
          "aoi": {
            "description": "Geographical surface in GeoJSON format",
            "$schema": "http://json-schema.org/draft-07/schema#",
            "$id": "https://geojson.org/schema/Polygon.json",
            "title": "GeoJSON Polygon",
            "type": "object",
            "required": [
              "type",
              "coordinates"
            ],
            "properties": {
              "type": {
                "type": "string",
                "enum": [
                  "Polygon"
                ]
              },
              "coordinates": {
                "type": "array",
                "items": {
                  "type": "array",
                  "minItems": 4,
                  "items": {
                    "type": "array",
                    "minItems": 2,
                    "items": {
                      "type": "number"
                    }
                  }
                }
              },
              "bbox": {
                "type": "array",
                "minItems": 4,
                "items": {
                  "type": "number"
                }
              }
            }
          },
          "validity": {
            "type": "object",
            "description": "The user request validity period",
            "title": "date period object definition",
            "additionalProperties": false,
            "properties": {
              "begin": {
                "type": "string",
                "format": "date-time",
                "description": "The start period with the following format yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
              },
              "end": {
                "type": "string",
                "format": "date-time",
                "description": "The end period with the following format yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
              }
            },
            "required": [
              "begin",
              "end"
            ]
          },
          "priority": {
            "type": "integer",
            "description": "The user request priority"
          },
          "parameters": {
            "type": "array",
            "description": "The User Request parameters for a given mission",
            "items": {
              "properties": {
                "constellation": {
                  "type": "string"
                },
                "userRequestMissionParameters": {
                  "$ref": "#/components/schemas/analyzeUserRequest/definitions/userRequestParameters"
                }
              }
            }
          }
        },
        "required": [
          "externalId",
          "aoi",
          "validity",
          "parameters"
        ],
        "definitions": {
          "userRequestParameters": {
            "title": "User request parameters object definition",
            "description": "Specific user request parameters for a mission",
            "properties": {
              "satellites": {
                "type": "array",
                "description": "The list of Satellites",
                "items": {
                  "type": "string"
                }
              },
              "downloadStations": {
                "type": "array",
                "description": "The list of download stations (acronym)",
                "items": {
                  "type": "string"
                }
              },
              "cloudCoverNotationMode": {
                "description": "Cloud cover notation mode",
                "type": "string",
                "enum": [
                  "MANUAL",
                  "AUTOMATIC"
                ]
              },
              "clearSkyRejectionSelectionThreshold": {
                "description": "minimum forecast clear sky percentage for programming the request (in %)",
                "type": "number"
              },
              "clearSkyRejectionValidationThreshold": {
                "description": "minimum forecast clear sky percentage for programming the request (in %)",
                "type": "number"
              },
              "cap": {
                "description": "Acquisition cap in degree",
                "type": "number"
              },
              "monopass": {
                "type": "boolean",
                "description": "Indicates if the ProgR is monopass."
              },
              "acquisitionMode": {
                "description": "programming order acquisition mode",
                "type": "string",
                "enum": [
                  "MONOSCOPIC",
                  "STEREO",
                  "TRISTEREO",
                  "N_UPLET"
                ]
              },
              "bhMin": {
                "type": "number",
                "description": "Minimum B/H, in case of stereo or tristereo acquisition mode only."
              },
              "bhMax": {
                "type": "number",
                "description": "Maximum B/H, in case of stereo or tristereo acquisition mode only."
              },
              "psiXMin": {
                "type": "number",
                "description": "Max Roll. In the case of stereo or tri-stereo with STEREO_TYPE set to FORWARD_BACKWARD this parameter concerns the 'forward' acquisition."
              },
              "psiXMax": {
                "type": "number",
                "description": "Max Roll. In the case of stereo or tri-stereo with STEREO_TYPE set to FORWARD_BACKWARD this parameter concerns the 'forward' acquisition."
              },
              "psiYMin": {
                "type": "number",
                "description": "Min Pitch. In the case of stereo or tri-stereo with STEREO_TYPE set to FORWARD_BACKWARD this parameter concerns the 'forward' acquisition."
              },
              "psiYMax": {
                "type": "number",
                "description": "Max Pitch. In the case of stereo or tri-stereo with STEREO_TYPE set to FORWARD_BACKWARD this parameter concerns the 'forward' acquisition."
              },
              "psiXYMax": {
                "type": "number",
                "description": "Max RollPitch. In the case of stereo or tri-stereo this parameter concerns both 'forward' and 'backward' acquisitions."
              }
            }
          }
        }
      },
      "userRequestAnalyzed": {
        "$id": "UserRequestAnalyzed.json",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "additionalProperties": false,
        "title": "UserRequestAnalyzed object definition",
        "type": "object",
        "allOf": [
          {
            "type": "object",
            "title": "The User Request analyzis response description",
            "additionalProperties": false,
            "properties": {
              "acquisitions": {
                "type": "array",
                "description": "The list of acquisitions returned for the feasibility",
                "items": {
                  "properties": {
                    "constellation": {
                      "type": "string",
                      "description": "The constellation"
                    },
                    "acquisitions": {
                      "type": "array",
                      "description": "The acquisitions returned during a feasibility computation for the given mission",
                      "items": {
                        "$id": "AcquisitionRequest.json",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "additionalProperties": false,
                        "description": "AcquisitionRequest definitions",
                        "type": "object",
                        "title": "Acquisition Request object definition",
                        "properties": {
                          "externalId": {
                            "description": "The acquisition request ExternalId\nPattern : ACQR_idProgR_idProgr_indexListAcqR",
                            "type": "string"
                          },
                          "status": {
                            "description": "Acquisition request state",
                            "type": "string",
                            "enum": [
                              "ACTIVATED",
                              "CANCELLED",
                              "COMPLETED"
                            ]
                          },
                          "datedDtos": {
                            "description": "Dated DTOs computed during algo datation computation. ",
                            "type": "array",
                            "items": {
                              "description": "DatedDto definitions",
                              "title": "Dated DTO object definition",
                              "type": "object",
                              "additionalProperties": false,
                              "allOf": [
                                {
                                  "description": "Dto definitions",
                                  "title": "DTO object definition",
                                  "type": "object",
                                  "additionalProperties": false,
                                  "properties": {
                                    "guid": {
                                      "description": "The pso dto GUID\nPattern :DTO_progRid_progRid_indexListAcqR_orbitNumber_satellite",
                                      "type": "string"
                                    },
                                    "satellite": {
                                      "description": "DTO Satellite",
                                      "type": "string"
                                    },
                                    "orbitalDirection": {
                                      "description": "DTO direction",
                                      "type": "string",
                                      "enum": [
                                        "ASCENDING",
                                        "DESCENDING"
                                      ]
                                    },
                                    "accessRoll": {
                                      "description": "DTO minimum access roll",
                                      "type": "number"
                                    },
                                    "orbitNumber": {
                                      "description": "Orbit number in the cycle [1.. NbOrbitInCycle]",
                                      "type": "integer"
                                    },
                                    "psoStart": {
                                      "description": "DTO pso start (orbit number and position on orbit)",
                                      "$ref": "#/components/schemas/userRequestAnalyzed/allOf/0/properties/acquisitions/items/properties/acquisitions/items/properties/datedDtos/items/allOf/0/properties/psoEnd"
                                    },
                                    "psoMiddle": {
                                      "description": "DTO pso middle (orbit number and position on orbit)",
                                      "$ref": "#/components/schemas/userRequestAnalyzed/allOf/0/properties/acquisitions/items/properties/acquisitions/items/properties/datedDtos/items/allOf/0/properties/psoEnd"
                                    },
                                    "psoEnd": {
                                      "description": "DTO pso end (orbit number and position on orbit)",
                                      "$id": "PSO.json",
                                      "$schema": "http://json-schema.org/draft-07/schema#",
                                      "title": "PSO object definition",
                                      "additionalProperties": false,
                                      "type": "object",
                                      "properties": {
                                        "pso": {
                                          "description": "PSO definitions",
                                          "title": "PSO object definition",
                                          "type": "object",
                                          "additionalProperties": false,
                                          "properties": {
                                            "orbitNumber": {
                                              "description": "Orbit number in the cycle [1.. NbOrbitInCycle]",
                                              "type": "integer"
                                            },
                                            "durationFromStart": {
                                              "description": "The duration in seconds from the start of the orbit",
                                              "type": "number"
                                            }
                                          }
                                        }
                                      }
                                    },
                                    "missionParameters": {
                                      "description": "Mission specific parameters",
                                      "type": "object"
                                    }
                                  }
                                },
                                {
                                  "properties": {
                                    "guid": {
                                      "description": "The dated dto GUID\nPattern :DTO_progRid_progRid_indexListAcqR_cycle_orbiteNumber_orbitNumber_satellite_psoDeltaStart",
                                      "type": "string"
                                    },
                                    "externalId": {
                                      "description": "The dated dto external id",
                                      "type": "string"
                                    },
                                    "priority": {
                                      "description": "DTO override priority",
                                      "type": "string",
                                      "enum": [
                                        "NONE",
                                        "LOW",
                                        "NORMAL",
                                        "HIGH",
                                        "FULL"
                                      ]
                                    },
                                    "period": {
                                      "description": "The computed period of the opportunity",
                                      "$ref": "#/components/schemas/analyzeUserRequest/properties/validity"
                                    },
                                    "orbitCycleNumber": {
                                      "description": "Orbit cycle number",
                                      "type": "integer"
                                    },
                                    "solarElevationAngle": {
                                      "description": "Angle between vertical of the center of acqr and the sun (in degree)",
                                      "type": "number",
                                      "minimum": 0,
                                      "maximum": 90
                                    }
                                  }
                                }
                              ]
                            }
                          },
                          "meshes": {
                            "description": "Meshes computed during algo split",
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/userRequestAnalyzed/allOf/0/properties/acquisitions/items/properties/acquisitions/items/definitions/mesh"
                            }
                          },
                          "missionParameters": {
                            "description": "Mission specific parameters",
                            "type": "object"
                          }
                        },
                        "definitions": {
                          "mesh": {
                            "description": "Mesh definitions",
                            "title": "Mesh object definition",
                            "type": "object",
                            "additionalProperties": false,
                            "properties": {
                              "guid": {
                                "description": "GUID of the mesh",
                                "type": "string"
                              },
                              "aoi": {
                                "description": "Polygon of the mesh. Composed of 6 points, 4 corners and 2 points, one at the center of each north and south edges",
                                "$ref": "#/components/schemas/analyzeUserRequest/properties/aoi"
                              },
                              "meanAcquisitionDuration": {
                                "description": "Mean acquisition duration of the mesh, in seconds.",
                                "type": "number"
                              },
                              "usefulArea": {
                                "description": "Useful area of the Mesh, in square meters.",
                                "type": "number"
                              },
                              "gridCellIds": {
                                "description": "Identifiers of the cells corresponding to the mesh, Only present in case of WLG split\nFormat  : LayerHemisphere_LayerNumber_CellIndexLongitude_CellIndexLatitude",
                                "type": "array",
                                "items": {
                                  "type": "string"
                                }
                              },
                              "missionParameters": {
                                "description": "Mission specific parameters",
                                "type": "object"
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "required": [
              "acquisitions"
            ]
          }
        ]
      },
      "getUserRequestsResponse": {
        "$id": "GetUserRequestsResponse.json",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "additionalProperties": false,
        "title": "Get UserRequests Response object definition",
        "type": "array",
        "items": {
          "title": "User Request Response",
          "type": "object",
          "properties": {
            "guid": {
              "type": "string",
              "description": "The user request guid"
            },
            "externalId": {
              "description": "Extern ID\nEmpty for internal user request",
              "type": "string",
              "pattern": "^[A-Za-z0-9 !\\\"#$%&'*+,-./:;<=>?@^_`(|)~]{1,500}$"
            },
            "status": {
              "description": "The User request status",
              "type": "string",
              "enum": [
                "ACTIVATED",
                "COMPLETED",
                "CANCELLED"
              ]
            },
            "aoi": {
              "$ref": "#/components/schemas/analyzeUserRequest/properties/aoi",
              "description": "Geographical surface in GeoJSON format"
            },
            "validity": {
              "type": "object",
              "description": "The user request validity period",
              "$ref": "#/components/schemas/analyzeUserRequest/properties/validity"
            },
            "priority": {
              "type": "integer",
              "description": "The user request priority"
            },
            "coverageCompletion": {
              "description": "The real User request coverage progression computed over time with follow-up. Represents the % of the AOI acquired over time",
              "type": "array",
              "items": {
                "type": "object",
                "description": "A result progress item with date and pourcentage",
                "additionalProperties": false,
                "properties": {
                  "date": {
                    "type": "string",
                    "format": "date-time",
                    "description": "The date with the following format yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
                  },
                  "progress": {
                    "description": "Coverage progress at date (in %)",
                    "type": "number"
                  }
                },
                "required": [
                  "date",
                  "progress"
                ]
              }
            }
          },
          "required": [
            "externalId",
            "aoi",
            "status",
            "validity",
            "guid"
          ]
        }
      },
      "getUserRequestDetailsResponse": {
        "$id": "GetUserRequestDetailsResponse.json",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "additionalProperties": true,
        "title": "GetUserRequestDetailsResponse object definition",
        "type": "object",
        "allOf": [
          {
            "$ref": "#/components/schemas/submitUserRequest/allOf/0",
            "description": "The UserRequest object"
          },
          {
            "type": "object",
            "title": "User Request details response",
            "description": "A User Request details response. Programming requests represents the programming requests on each constellation.",
            "additionalProperties": false,
            "properties": {
              "externalId": {
                "description": "Extern ID\nEmpty for internal user request",
                "type": "string"
              },
              "status": {
                "description": "The User request status",
                "type": "string"
              },
              "aoi": {
                "description": "Geographical surface in GeoJSON format (polygon)",
                "$ref": "#/components/schemas/analyzeUserRequest/properties/aoi"
              },
              "validity": {
                "description": "The user request validity period",
                "$ref": "#/components/schemas/analyzeUserRequest/properties/validity"
              },
              "priority": {
                "description": "The user request priority",
                "type": "integer"
              },
              "userRequestMissionParameters": {
                "type": "array",
                "description": "The User Request parameters for a given mission",
                "items": {
                  "$ref": "#/components/schemas/submitUserRequest/allOf/0/definitions/userRequestParameters"
                }
              },
              "guid": {
                "type": "string",
                "description": "The user request guid"
              },
              "programmingRequests": {
                "type": "array",
                "description": "The list of programming requests associated to the given user request. Is empty for MESHING_SUBDIVISION and EVOLVING_MESHING_SUBDIVISION",
                "items": {
                  "$ref": "#/components/schemas/userRequestSubmitted/allOf/1/properties/programmingRequests/items"
                }
              },
              "coverageCompletion": {
                "description": "The real User request coverage progression computed over time with follow-up. Represents the % of the AOI acquired over time. It also contains the UserRequest projection completion using the aggregation of its programming request simulated coverage completions",
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/getUserRequestsResponse/items/properties/coverageCompletion/items"
                }
              }
            },
            "required": [
              "guid"
            ]
          }
        ]
      },
      "submitUserRequest": {
        "$id": "SubmitUserRequest.json",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "additionalProperties": true,
        "title": "SubmitUserRequest object definition",
        "description": "The SubmitUserRequest object definition",
        "type": "object",
        "allOf": [
          {
            "additionalProperties": true,
            "title": "UserRequest object definition",
            "description": "The UserRequest object definition",
            "type": "object",
            "properties": {
              "externalId": {
                "description": "Extern ID\nEmpty for internal user request",
                "type": "string",
                "pattern": "^[A-Za-z0-9 !\\\"#$%&'*+,-./:;<=>?@^_`(|)~]{1,500}$"
              },
              "status": {
                "description": "The User request status",
                "type": "string",
                "enum": [
                  "CREATED",
                  "ANALYZED",
                  "ACTIVATED",
                  "COMPLETED",
                  "CANCELLED"
                ]
              },
              "aoi": {
                "$ref": "#/components/schemas/analyzeUserRequest/properties/aoi",
                "description": "Geographical surface in GeoJSON format"
              },
              "validity": {
                "description": "The user request validity period",
                "$ref": "#/components/schemas/analyzeUserRequest/properties/validity"
              },
              "priority": {
                "type": "integer",
                "description": "The user request priority"
              },
              "userRequestMissionParameters": {
                "type": "array",
                "description": "The User Request parameters for a given mission",
                "items": {
                  "$ref": "#/components/schemas/submitUserRequest/allOf/0/definitions/userRequestParameters"
                }
              }
            },
            "required": [
              "externalId",
              "aoi",
              "validity",
              "userRequestMissionParameters"
            ],
            "definitions": {
              "userRequestParameters": {
                "title": "User request parameters object definition",
                "description": "Specific user request parameters for a mission",
                "properties": {
                  "constellation": {
                    "type": "string",
                    "description": "The constellation"
                  },
                  "satellites": {
                    "type": "array",
                    "description": "The list of Satellites",
                    "items": {
                      "type": "string"
                    }
                  },
                  "downloadStations": {
                    "type": "array",
                    "description": "The list of download stations (acronym)",
                    "items": {
                      "type": "string"
                    }
                  },
                  "cloudCoverNotationMode": {
                    "description": "Cloud cover notation mode",
                    "type": "string",
                    "enum": [
                      "MANUAL",
                      "AUTOMATIC"
                    ]
                  },
                  "clearSkyRejectionSelectionThreshold": {
                    "description": "minimum forecast clear sky percentage for programming the request (in %)",
                    "type": "number"
                  },
                  "clearSkyRejectionValidationThreshold": {
                    "description": "minimum forecast clear sky percentage for programming the request (in %)",
                    "type": "number"
                  },
                  "priority": {
                    "description": "Describe the priority of the programming request. 1 is the greatest priority",
                    "type": "integer",
                    "minimum": 1,
                    "maximum": 16
                  },
                  "cap": {
                    "description": "Acquisition cap in degree",
                    "type": "number"
                  },
                  "monopass": {
                    "type": "boolean",
                    "description": "Indicates if the ProgR is monopass."
                  },
                  "acquisitionMode": {
                    "description": "programming order acquisition mode",
                    "type": "string",
                    "enum": [
                      "MONOSCOPIC",
                      "STEREO",
                      "TRISTEREO",
                      "N_UPLET"
                    ]
                  },
                  "angularConstraintsType": {
                    "description": "Angular constraints type",
                    "type": "string",
                    "enum": [
                      "DEPOINTING"
                    ]
                  },
                  "bhMin": {
                    "type": "number",
                    "description": "Minimum B/H, in case of stereo or tristereo acquisition mode only."
                  },
                  "bhMax": {
                    "type": "number",
                    "description": "Maximum B/H, in case of stereo or tristereo acquisition mode only."
                  },
                  "psiXMin": {
                    "type": "number",
                    "description": "Max Roll. In the case of stereo or tri-stereo with STEREO_TYPE set to FORWARD_BACKWARD this parameter concerns the 'forward' acquisition."
                  },
                  "psiXMax": {
                    "type": "number",
                    "description": "Max Roll. In the case of stereo or tri-stereo with STEREO_TYPE set to FORWARD_BACKWARD this parameter concerns the 'forward' acquisition."
                  },
                  "psiYMin": {
                    "type": "number",
                    "description": "Min Pitch. In the case of stereo or tri-stereo with STEREO_TYPE set to FORWARD_BACKWARD this parameter concerns the 'forward' acquisition."
                  },
                  "psiYMax": {
                    "type": "number",
                    "description": "Max Pitch. In the case of stereo or tri-stereo with STEREO_TYPE set to FORWARD_BACKWARD this parameter concerns the 'forward' acquisition."
                  },
                  "psiXYMax": {
                    "type": "number",
                    "description": "Max RollPitch. In the case of stereo or tri-stereo this parameter concerns both 'forward' and 'backward' acquisitions."
                  }
                }
              }
            }
          },
          {
            "type": "object",
            "title": "User Request submission request",
            "description": "The User Request submission request description.",
            "additionalProperties": true,
            "properties": {
              "externalId": {
                "description": "Extern ID\nEmpty for internal user request",
                "type": "string"
              },
              "status": {
                "description": "The User request status",
                "type": "string"
              },
              "aoi": {
                "description": "Geographical surface in GeoJSON format (polygon)",
                "$ref": "#/components/schemas/analyzeUserRequest/properties/aoi"
              },
              "validity": {
                "description": "The user request validity period",
                "$ref": "#/components/schemas/analyzeUserRequest/properties/validity"
              },
              "priority": {
                "description": "The user request priority",
                "type": "integer"
              },
              "userRequestMissionParameters": {},
              "programmingRequests": {
                "type": "array",
                "description": "The list of programming requests associated to the given user request in case of UC1.a",
                "items": {
                  "$id": "ProgrammingRequest.json",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Programming order object definition",
                  "description": "The Programming order object definition",
                  "additionalProperties": false,
                  "type": "object",
                  "properties": {
                    "externalId": {
                      "description": "The programming request mission chain ExternalId\nPattern : PROGR_id_id",
                      "type": "string"
                    },
                    "constellation": {
                      "description": "The programming request mission",
                      "type": "string",
                      "pattern": "^[A-Za-z0-9 !\\\"#$%&'*+,-./:;<=>?@^_`(|)~]{1,500}$"
                    },
                    "priority": {
                      "description": "Describe the priority of the programming request. 1 is the greatest priority",
                      "type": "integer",
                      "minimum": 1,
                      "maximum": 16
                    },
                    "status": {
                      "description": "Programming request status",
                      "type": "string",
                      "enum": [
                        "ACTIVATED",
                        "CANCELLED",
                        "EXPIRED",
                        "COMPLETED"
                      ]
                    },
                    "validity": {
                      "description": "Validity period",
                      "$ref": "#/components/schemas/analyzeUserRequest/properties/validity"
                    },
                    "activationDate": {
                      "description": "The programming request activation date",
                      "type": "string",
                      "format": "date-time"
                    },
                    "aoi": {
                      "description": "Area of interest (MultiPolygon) in GeoJson format",
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "$id": "https://geojson.org/schema/MultiPolygon.json",
                      "title": "GeoJSON MultiPolygon",
                      "type": "object",
                      "required": [
                        "type",
                        "coordinates"
                      ],
                      "properties": {
                        "type": {
                          "type": "string",
                          "enum": [
                            "MultiPolygon"
                          ]
                        },
                        "coordinates": {
                          "type": "array",
                          "items": {
                            "type": "array",
                            "items": {
                              "type": "array",
                              "minItems": 4,
                              "items": {
                                "type": "array",
                                "minItems": 2,
                                "items": {
                                  "type": "number"
                                }
                              }
                            }
                          }
                        },
                        "bbox": {
                          "type": "array",
                          "minItems": 4,
                          "items": {
                            "type": "number"
                          }
                        }
                      }
                    },
                    "remainingToAcquire": {
                      "description": "The remaining to acquire of the area of interest in GeoJson format. Computed as the difference between the AOI and the completed meshes",
                      "$ref": "#/components/schemas/submitUserRequest/allOf/1/properties/programmingRequests/items/properties/aoi"
                    },
                    "satellites": {
                      "description": "The programming request list of satellites",
                      "type": "array",
                      "items": {
                        "type": "string",
                        "pattern": "^[A-Za-z0-9 !\\\"#$%&'*+,-./:;<=>?@^_`(|)~]{1,500}$"
                      }
                    },
                    "scoringParameters": {
                      "description": "Scoring Parameters",
                      "$ref": "#/components/schemas/submitUserRequest/allOf/1/properties/programmingRequests/items/definitions/scoringParameters"
                    },
                    "splitParameters": {
                      "description": "Split Parameters",
                      "$ref": "#/components/schemas/submitUserRequest/allOf/1/properties/programmingRequests/items/definitions/splitParameters"
                    },
                    "acquisitionParameters": {
                      "description": "Acquisition Parameters",
                      "$ref": "#/components/schemas/submitUserRequest/allOf/1/properties/programmingRequests/items/definitions/acquisitionParameters"
                    },
                    "angularConstraints": {
                      "description": "Angular constraint Parameters",
                      "title": "Angular constraints object definition",
                      "oneOf": [
                        {
                          "type": "object",
                          "additionalProperties": true,
                          "title": "Angular constraints by incidence object definition",
                          "description": "Only for monoscopic. The angular constraints by depointing (roll: pitch) and the angular constraints (azimuth:incidence) are exclusive",
                          "properties": {
                            "angularConstraintsType": {
                              "const": "INCIDENCE",
                              "type": "string"
                            },
                            "minAzimuthAngle": {
                              "description": "Min azimuth angle. minAzimuthAngle and maxAzimuthAngle must be optional (empty) or set together",
                              "type": "number"
                            },
                            "maxAzimuthAngle": {
                              "description": "Max azimuth angle. minAzimuthAngle and maxAzimuthAngle must be optional (empty) or set together",
                              "type": "number"
                            },
                            "maxGroundAngle": {
                              "description": "Max ground incidence angle",
                              "type": "number"
                            },
                            "missionParameters": {
                              "description": "Mission specific parameters",
                              "type": "object"
                            }
                          },
                          "required": [
                            "angularConstraintsType"
                          ]
                        },
                        {
                          "title": "Angular constraints by depointing object definition",
                          "allOf": [
                            {
                              "$ref": "#/components/schemas/submitUserRequest/allOf/1/properties/programmingRequests/items/properties/angularConstraints/oneOf/2/allOf/0"
                            },
                            {
                              "additionalProperties": true,
                              "properties": {
                                "angularConstraintsType": {
                                  "const": "DEPOINTING",
                                  "type": "string"
                                },
                                "psiXMin": {
                                  "description": "Max Roll. In the case of stereo or tri-stereo with STEREO_TYPE set to FORWARD_BACKWARD this parameter concerns the 'forward' acquisition.",
                                  "type": "number"
                                },
                                "psiXMax": {
                                  "description": "Max Roll. In the case of stereo or tri-stereo with STEREO_TYPE set to FORWARD_BACKWARD this parameter concerns the 'forward' acquisition.",
                                  "type": "number"
                                },
                                "psiYMin": {
                                  "description": "Min Pitch. In the case of stereo or tri-stereo with STEREO_TYPE set to FORWARD_BACKWARD this parameter concerns the 'forward' acquisition.",
                                  "type": "number"
                                },
                                "psiYMax": {
                                  "description": "Max Pitch. In the case of stereo or tri-stereo with STEREO_TYPE set to FORWARD_BACKWARD this parameter concerns the 'forward' acquisition.",
                                  "type": "number"
                                },
                                "psiXYMax": {
                                  "description": "Max RollPitch. In the case of stereo or tri-stereo this parameter concerns both 'forward' and 'backward' acquisitions.",
                                  "type": "number"
                                },
                                "bhMin": {
                                  "description": "Minimum B/H, in case of stereo or tristereo acquisition mode only.",
                                  "type": "number"
                                },
                                "bhMax": {
                                  "description": "Maximum B/H, in case of stereo or tristereo acquisition mode only.",
                                  "type": "number"
                                },
                                "missionParameters": {
                                  "type": "object",
                                  "description": "Mission specific parameters"
                                }
                              },
                              "required": [
                                "angularConstraintsType"
                              ]
                            }
                          ]
                        },
                        {
                          "description": "In case of forward/backward stereo only.The forward constraints will be specified by AN_ANGULAR_CONSTRAINTS_BY_DEPOINTING parameters. PSI_XY_MAX will apply for forward and backward acquisitions.The angular constraints by depointing (roll:pitch) and the angular constraints (azimuth:incidence) are exclusive",
                          "title": "Angular constraints by depointing forward backward object definition",
                          "allOf": [
                            {
                              "description": "Common fields of an angular constraint for depointing",
                              "properties": {
                                "psiXMin": {
                                  "description": "Max Roll. In the case of stereo or tri-stereo with STEREO_TYPE set to FORWARD_BACKWARD this parameter concerns the 'forward' acquisition.",
                                  "type": "number"
                                },
                                "psiXMax": {
                                  "description": "Max Roll. In the case of stereo or tri-stereo with STEREO_TYPE set to FORWARD_BACKWARD this parameter concerns the 'forward' acquisition.",
                                  "type": "number"
                                },
                                "psiYMin": {
                                  "description": "Min Pitch. In the case of stereo or tri-stereo with STEREO_TYPE set to FORWARD_BACKWARD this parameter concerns the 'forward' acquisition.",
                                  "type": "number"
                                },
                                "psiYMax": {
                                  "description": "Max Pitch. In the case of stereo or tri-stereo with STEREO_TYPE set to FORWARD_BACKWARD this parameter concerns the 'forward' acquisition.",
                                  "type": "number"
                                },
                                "psiXYMax": {
                                  "description": "Max RollPitch. In the case of stereo or tri-stereo this parameter concerns both 'forward' and 'backward' acquisitions.",
                                  "type": "number"
                                },
                                "bhMin": {
                                  "description": "Minimum B/H, in case of stereo or tristereo acquisition mode only.",
                                  "type": "number"
                                },
                                "bhMax": {
                                  "description": "Maximum B/H, in case of stereo or tristereo acquisition mode only.",
                                  "type": "number"
                                },
                                "missionParameters": {
                                  "description": "Mission specific parameters",
                                  "type": "object"
                                }
                              }
                            },
                            {
                              "description": "Specific fields of an angular constraint in case of forward/backward stereo",
                              "properties": {
                                "psiXMinBackward": {
                                  "description": "Min X backward roll, in case of forward/backward.",
                                  "type": "number"
                                },
                                "psiXMaxBackward": {
                                  "description": "Max X backward roll, in case of forward/backward.",
                                  "type": "number"
                                },
                                "psiYMinBackward": {
                                  "description": "Min Y backward pitch, in case of forward/backward.",
                                  "type": "number"
                                },
                                "psiYMaxBackward": {
                                  "description": "Max Y backward pitch, in case of forward/backward.",
                                  "type": "number"
                                }
                              }
                            },
                            {
                              "type": "object",
                              "additionalProperties": true,
                              "properties": {
                                "angularConstraintsType": {
                                  "const": "DEPOINTING_FWD_BWD",
                                  "type": "string"
                                },
                                "psiXMin": {
                                  "description": "Max Roll. In the case of stereo or tri-stereo with STEREO_TYPE set to FORWARD_BACKWARD this parameter concerns the 'forward' acquisition.",
                                  "type": "number"
                                },
                                "psiXMax": {
                                  "description": "Max Roll. In the case of stereo or tri-stereo with STEREO_TYPE set to FORWARD_BACKWARD this parameter concerns the 'forward' acquisition.",
                                  "type": "number"
                                },
                                "psiYMin": {
                                  "description": "Min Pitch. In the case of stereo or tri-stereo with STEREO_TYPE set to FORWARD_BACKWARD this parameter concerns the 'forward' acquisition.",
                                  "type": "number"
                                },
                                "psiYMax": {
                                  "description": "Max Pitch. In the case of stereo or tri-stereo with STEREO_TYPE set to FORWARD_BACKWARD this parameter concerns the 'forward' acquisition.",
                                  "type": "number"
                                },
                                "psiXYMax": {
                                  "description": "Max RollPitch. In the case of stereo or tri-stereo this parameter concerns both 'forward' and 'backward' acquisitions.",
                                  "type": "number"
                                },
                                "bhMin": {
                                  "description": "Minimum B/H, in case of stereo or tristereo acquisition mode only.",
                                  "type": "number"
                                },
                                "bhMax": {
                                  "description": "Maximum B/H, in case of stereo or tristereo acquisition mode only.",
                                  "type": "number"
                                },
                                "missionParameters": {
                                  "description": "Mission specific parameters",
                                  "type": "object"
                                },
                                "psiXMinBackward": {
                                  "description": "Min X backward roll, in case of forward/backward.",
                                  "type": "number"
                                },
                                "psiXMaxBackward": {
                                  "description": "Max X backward roll, in case of forward/backward.",
                                  "type": "number"
                                },
                                "psiYMinBackward": {
                                  "description": "Min Y backward pitch, in case of forward/backward.",
                                  "type": "number"
                                },
                                "psiYMaxBackward": {
                                  "description": "Max Y backward pitch, in case of forward/backward.",
                                  "type": "number"
                                }
                              },
                              "required": [
                                "angularConstraintsType"
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    "downloadParameters": {
                      "description": "Download Parameters",
                      "$ref": "#/components/schemas/submitUserRequest/allOf/1/properties/programmingRequests/items/definitions/downloadParameters"
                    },
                    "initialCoverageCompletion": {
                      "description": "The programming order initial estimated coverage completion. Not computed for MESHING_SUBDIVISION and EVOLVING_MESHING_SUBDIVISION",
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/submitUserRequest/allOf/1/properties/programmingRequests/items/properties/latestCoverageCompletion/items"
                      }
                    },
                    "latestCoverageCompletion": {
                      "description": "The programming order latest estimated coverage completion. Not computed for MESHING_SUBDIVISION and EVOLVING_MESHING_SUBDIVISION",
                      "type": "array",
                      "items": {
                        "type": "object",
                        "description": "A coverage completion result",
                        "additionalProperties": false,
                        "properties": {
                          "simulationYear": {
                            "description": "The weather year used for the simulation",
                            "type": "integer"
                          },
                          "completed": {
                            "description": "Flag indicating if the request is completed before the end of its validity period",
                            "type": "boolean"
                          },
                          "completionDate": {
                            "type": "string",
                            "format": "date-time",
                            "description": "The coverage completion date with the following format yyyy-MM-dd'T'HH:mm:ss.SSS'Z' only if completed"
                          },
                          "progressAtDate": {
                            "description": "Coverage progress at validity end date (in %)",
                            "type": "number"
                          },
                          "progress": {
                            "type": "array",
                            "description": "The coverage progression by day",
                            "items": {
                              "$ref": "#/components/schemas/getUserRequestsResponse/items/properties/coverageCompletion/items",
                              "description": "A result progress item with date and pourcentage"
                            }
                          }
                        },
                        "required": [
                          "simulationYear",
                          "completed",
                          "progressAtDate",
                          "progress"
                        ]
                      }
                    },
                    "missionParameters": {
                      "description": "Mission specific parameters",
                      "type": "object"
                    },
                    "acquisitions": {
                      "type": "array",
                      "description": "The acquisitions returned the analysis of the mission",
                      "items": {
                        "$ref": "#/components/schemas/userRequestAnalyzed/allOf/0/properties/acquisitions/items/properties/acquisitions/items"
                      }
                    }
                  },
                  "required": [
                    "constellation",
                    "validity",
                    "aoi",
                    "satellites"
                  ],
                  "definitions": {
                    "scoringParameters": {
                      "description": "ScoringParameters definitions",
                      "title": "Scoring Parameters object definition",
                      "type": "object",
                      "additionalProperties": false,
                      "properties": {
                        "areaWeightingFlag": {
                          "description": "Area weighting indicator used during PlanDTO rating computation.",
                          "type": "boolean"
                        },
                        "coreWeightingFlag": {
                          "description": "Core weighting indicator used during PlanDTO rating computation. This parameter may be used to show if a mesh\n already validated, contiguous to the mesh should be considered into rating computation. In this case, it must be\n set to true.",
                          "type": "boolean"
                        },
                        "catalogWeightingFlag": {
                          "description": "Catalog waiting indicator for PlanDTO rating computation",
                          "type": "boolean"
                        },
                        "weatherWeightingFlag": {
                          "description": "Weather waiting indicator for planned DTO rating computation.",
                          "type": "boolean"
                        },
                        "clearSkyRejectionThreshold": {
                          "description": "Clear sky threshold below which it is useless to acquire a DTO. Integer from 0 to 100. This threshold is used during PlanDTO rating computation.",
                          "type": "integer",
                          "minimum": 0,
                          "maximum": 100
                        },
                        "clearSkyBonusThreshold": {
                          "description": "Clear sky threshold above which it is interesting to boost the DTO to  benefit from exceptional weather conditions. This threshold is used during'PlanDTO' rating computation..",
                          "type": "integer",
                          "minimum": 0,
                          "maximum": 100
                        },
                        "missionParameters": {
                          "description": "Mission specific parameters",
                          "type": "object"
                        }
                      }
                    },
                    "splitParameters": {
                      "description": "SplitParameters definitions",
                      "title": "Split Parameters object definition",
                      "type": "object",
                      "additionalProperties": false,
                      "properties": {
                        "method": {
                          "description": "Split method to be used",
                          "type": "string",
                          "enum": [
                            "WORLD_LAYERED_SPLIT",
                            "DYNAMIC_FIXED_ORIENTATION",
                            "IMPOSED_MESH"
                          ]
                        },
                        "maxMeshLength": {
                          "description": "Max mesh length in m. In case of WLG, will be converted in cells number. Empty only in case of monopass ProgR or With IMPOSED_MESH split method.",
                          "type": "number"
                        },
                        "cap": {
                          "description": "Direction of split, in case of dynamic split only, empty otherwise. \nDirection of the bearing. In degrees. \nBearing will depend if the tasking satellite is ascending or descending. 0 degrees correspond to a North/South or South/North acquisition",
                          "type": "number"
                        },
                        "overlapMarginAlongTrack": {
                          "description": "Overlapping length margin between meshes, used to split the ProgR in case of dynamic split only(in m), empty Otherwise.",
                          "type": "number"
                        },
                        "overlapMarginAcrossTrack": {
                          "description": "Overlapping width margin between meshes, used to split the ProgR in case of dynamic split only(in m), empty otherwise.",
                          "type": "number"
                        },
                        "missionParameters": {
                          "description": "Mission specific parameters",
                          "type": "object"
                        }
                      }
                    },
                    "acquisitionParameters": {
                      "description": "AcquisitionParameters definitions",
                      "title": "Acquisition Parameters object definition",
                      "type": "object",
                      "additionalProperties": false,
                      "properties": {
                        "acquisitionType": {
                          "description": "The type of acquisition (standard, astral,...)",
                          "type": "string"
                        },
                        "mode": {
                          "description": "Programming request acquisition mode.",
                          "type": "string",
                          "enum": [
                            "MONOSCOPIC",
                            "STEREO",
                            "TRISTEREO",
                            "QUADRISTEREO",
                            "N_UPLET"
                          ]
                        },
                        "monopass": {
                          "description": "Indicates if the Programming request is monopass.",
                          "type": "boolean"
                        },
                        "stereoType": {
                          "description": "Type of stereo mode, in case of stereo or tri-stereo acquisition mode only, empty otherwise.",
                          "type": "string",
                          "enum": [
                            "QUASI_SYMETRICAL",
                            "FORWARD_BACKWARD"
                          ]
                        },
                        "luminosityThreshold": {
                          "description": "Acceptable solar elevation angle for luminosity threshold. Not set (Empty) means CSS value is used by Mission algorithms, \n0 value means no luminosity constraint checks by mission algorithms\nSolar elevation angle for luminosity threshold",
                          "type": "number",
                          "minimum": 0,
                          "maximum": 90
                        },
                        "orbitalPhase": {
                          "description": "Indicates if the acquisition shall be done during the day or the night.",
                          "type": "string",
                          "enum": [
                            "DAY",
                            "NIGHT"
                          ]
                        },
                        "guidanceMode": {
                          "description": "Gives the guidance method to use.",
                          "type": "string",
                          "pattern": "^[A-Za-z0-9 !\\\"#$%&'*+,-./:;<=>?@^_`(|)~]{1,500}$"
                        },
                        "nUpletAcquisitionsNumber": {
                          "description": "Number of acquisitions, in case of n-uplet acquisition mode only, empty otherwise. All of these N acquisitions Must be taken during the same orbit.",
                          "type": "integer"
                        },
                        "missionParameters": {
                          "description": "Mission specific parameters",
                          "type": "object"
                        }
                      }
                    },
                    "downloadParameters": {
                      "description": "DownloadParameters definitions",
                      "title": "Download Parameters object definition",
                      "type": "object",
                      "additionalProperties": false,
                      "properties": {
                        "downloadBranches": {
                          "description": "Download branch list",
                          "type": "array",
                          "items": {
                            "$ref": "#/components/schemas/submitUserRequest/allOf/1/properties/programmingRequests/items/definitions/downloadBranch"
                          }
                        },
                        "missionParameters": {
                          "description": "Mission specific parameters",
                          "type": "object"
                        }
                      }
                    },
                    "downloadBranch": {
                      "description": "DownloadBranch definitions",
                      "title": "Download Branch object definition",
                      "type": "object",
                      "additionalProperties": false,
                      "properties": {
                        "inventoryCenter": {
                          "description": "Identifier of the INVENTOY center",
                          "type": "string",
                          "pattern": "^[A-Za-z0-9]{3,4}$"
                        },
                        "stations": {
                          "description": "List of acronym of the download station for TMI",
                          "type": "array",
                          "items": {
                            "type": "string",
                            "pattern": "^[A-Za-z0-9]{3,4}$"
                          }
                        },
                        "validating": {
                          "description": "Indicates whether the download branch is a validating one or not",
                          "type": "boolean"
                        },
                        "missionParameters": {
                          "description": "Mission specific parameters",
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        ]
      },
      "userRequestSubmitted": {
        "$id": "UserRequestSubmitted.json",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "additionalProperties": true,
        "title": "UserRequestSubmitted object definition",
        "type": "object",
        "allOf": [
          {
            "$ref": "#/components/schemas/submitUserRequest/allOf/0",
            "description": "The UserRequest object"
          },
          {
            "type": "object",
            "title": "User Request submission response",
            "description": "The User Request submission response description. Programming requests represents the programming requests send to the missions. It can be empty. Acquisitions are the acquisitions computed during the feasibility (used for MESHING_SUBDIVISION and EVOLVING_MESHING_SUBDIVISION)",
            "additionalProperties": false,
            "properties": {
              "externalId": {
                "description": "Extern ID\nEmpty for internal user request",
                "type": "string"
              },
              "status": {
                "description": "The User request status",
                "type": "string"
              },
              "aoi": {
                "description": "Geographical surface in GeoJSON format (polygon)",
                "$ref": "#/components/schemas/analyzeUserRequest/properties/aoi"
              },
              "validity": {
                "description": "The user request validity period",
                "$ref": "#/components/schemas/analyzeUserRequest/properties/validity"
              },
              "priority": {
                "description": "The user request priority",
                "type": "integer"
              },
              "userRequestMissionParameters": {
                "type": "array",
                "description": "The User Request parameters for a given mission",
                "items": {
                  "$ref": "#/components/schemas/submitUserRequest/allOf/0/definitions/userRequestParameters"
                }
              },
              "guid": {
                "type": "string",
                "description": "The user request guid"
              },
              "programmingRequests": {
                "type": "array",
                "description": "The list of programming requests associated to the given user request. Is empty for MESHING_SUBDIVISION and EVOLVING_MESHING_SUBDIVISION",
                "items": {
                  "$id": "ProgrammingRequestDetails.json",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Programming order details object definition",
                  "description": "The Programming order details object definition",
                  "additionalProperties": false,
                  "type": "object",
                  "properties": {
                    "externalId": {
                      "description": "The programming request mission chain ExternalId\nPattern : PROGR_id_id",
                      "type": "string"
                    },
                    "constellation": {
                      "description": "The programming request mission",
                      "type": "string",
                      "pattern": "^[A-Za-z0-9 !\\\"#$%&'*+,-./:;<=>?@^_`(|)~]{1,500}$"
                    },
                    "priority": {
                      "description": "Describe the priority of the programming request. 1 is the greatest priority",
                      "type": "integer",
                      "minimum": 1,
                      "maximum": 16
                    },
                    "status": {
                      "description": "Programming request status",
                      "type": "string",
                      "enum": [
                        "ACTIVATED",
                        "CANCELLED",
                        "EXPIRED",
                        "COMPLETED"
                      ]
                    },
                    "validity": {
                      "description": "Validity period",
                      "$ref": "#/components/schemas/analyzeUserRequest/properties/validity"
                    },
                    "activationDate": {
                      "description": "The programming request activation date",
                      "type": "string",
                      "format": "date-time"
                    },
                    "aoi": {
                      "description": "Area of interest (MultiPolygon) in GeoJson format",
                      "$ref": "#/components/schemas/submitUserRequest/allOf/1/properties/programmingRequests/items/properties/aoi"
                    },
                    "remainingToAcquire": {
                      "description": "The remaining to acquire of the area of interest in GeoJson format. Computed as the difference between the AOI and the completed meshes",
                      "$ref": "#/components/schemas/submitUserRequest/allOf/1/properties/programmingRequests/items/properties/aoi"
                    },
                    "satellites": {
                      "description": "The programming request list of satellites",
                      "type": "array",
                      "items": {
                        "type": "string",
                        "pattern": "^[A-Za-z0-9 !\\\"#$%&'*+,-./:;<=>?@^_`(|)~]{1,500}$"
                      }
                    },
                    "scoringParameters": {
                      "description": "Scoring Parameters",
                      "$ref": "#/components/schemas/userRequestSubmitted/allOf/1/properties/programmingRequests/items/definitions/scoringParameters"
                    },
                    "splitParameters": {
                      "description": "Split Parameters",
                      "$ref": "#/components/schemas/userRequestSubmitted/allOf/1/properties/programmingRequests/items/definitions/splitParameters"
                    },
                    "acquisitionParameters": {
                      "description": "Acquisition Parameters",
                      "$ref": "#/components/schemas/userRequestSubmitted/allOf/1/properties/programmingRequests/items/definitions/acquisitionParameters"
                    },
                    "angularConstraints": {
                      "description": "Angular constraint Parameters",
                      "$ref": "#/components/schemas/submitUserRequest/allOf/1/properties/programmingRequests/items/properties/angularConstraints"
                    },
                    "downloadParameters": {
                      "description": "Download Parameters",
                      "$ref": "#/components/schemas/userRequestSubmitted/allOf/1/properties/programmingRequests/items/definitions/downloadParameters"
                    },
                    "initialCoverageCompletion": {
                      "description": "The programming order initial estimated coverage completion. Not computed for MESHING_SUBDIVISION and EVOLVING_MESHING_SUBDIVISION",
                      "$ref": "#/components/schemas/userRequestSubmitted/allOf/1/properties/programmingRequests/items/properties/latestCoverageCompletion"
                    },
                    "latestCoverageCompletion": {
                      "description": "The programming order latest estimated coverage completion. Not computed for MESHING_SUBDIVISION and EVOLVING_MESHING_SUBDIVISION",
                      "type": "object",
                      "properties": {
                        "simulationYears": {
                          "description": "The weather years used for the simulations",
                          "type": "array",
                          "items": {
                            "type": "integer"
                          }
                        },
                        "completed": {
                          "description": "Flag indicating if the programming order is completed before its validity end date",
                          "type": "boolean"
                        },
                        "completionDate": {
                          "type": "string",
                          "format": "date-time",
                          "description": "The estimated coverage completion date with the following format yyyy-MM-dd'T'HH:mm:ss.SSS'Z' only if completed"
                        },
                        "progressAtDate": {
                          "description": "Coverage progress at validity end date (in %)",
                          "type": "number"
                        },
                        "progress": {
                          "type": "array",
                          "description": "The coverage progression by day",
                          "items": {
                            "$ref": "#/components/schemas/getUserRequestsResponse/items/properties/coverageCompletion/items"
                          }
                        }
                      },
                      "required": [
                        "simulationYears",
                        "completed",
                        "progress",
                        "progressAtDate"
                      ]
                    },
                    "missionParameters": {
                      "description": "Mission specific parameters",
                      "type": "object"
                    },
                    "acquisitions": {
                      "type": "array",
                      "description": "The acquisitions returned the analysis of the mission",
                      "items": {
                        "$ref": "#/components/schemas/userRequestAnalyzed/allOf/0/properties/acquisitions/items/properties/acquisitions/items"
                      }
                    }
                  },
                  "required": [
                    "constellation",
                    "validity",
                    "aoi",
                    "satellites"
                  ],
                  "definitions": {
                    "scoringParameters": {
                      "description": "ScoringParameters definitions",
                      "title": "Scoring Parameters object definition",
                      "type": "object",
                      "additionalProperties": false,
                      "properties": {
                        "areaWeightingFlag": {
                          "description": "Area weighting indicator used during PlanDTO rating computation.",
                          "type": "boolean"
                        },
                        "coreWeightingFlag": {
                          "description": "Core weighting indicator used during PlanDTO rating computation. This parameter may be used to show if a mesh\n already validated, contiguous to the mesh should be considered into rating computation. In this case, it must be\n set to true.",
                          "type": "boolean"
                        },
                        "catalogWeightingFlag": {
                          "description": "Catalog waiting indicator for PlanDTO rating computation",
                          "type": "boolean"
                        },
                        "weatherWeightingFlag": {
                          "description": "Weather waiting indicator for planned DTO rating computation.",
                          "type": "boolean"
                        },
                        "clearSkyRejectionThreshold": {
                          "description": "Clear sky threshold below which it is useless to acquire a DTO. Integer from 0 to 100. This threshold is used during PlanDTO rating computation.",
                          "type": "integer",
                          "minimum": 0,
                          "maximum": 100
                        },
                        "clearSkyBonusThreshold": {
                          "description": "Clear sky threshold above which it is interesting to boost the DTO to  benefit from exceptional weather conditions. This threshold is used during'PlanDTO' rating computation..",
                          "type": "integer",
                          "minimum": 0,
                          "maximum": 100
                        },
                        "missionParameters": {
                          "description": "Mission specific parameters",
                          "type": "object"
                        }
                      }
                    },
                    "splitParameters": {
                      "description": "SplitParameters definitions",
                      "title": "Split Parameters object definition",
                      "type": "object",
                      "additionalProperties": false,
                      "properties": {
                        "method": {
                          "description": "Split method to be used",
                          "type": "string",
                          "enum": [
                            "WORLD_LAYERED_SPLIT",
                            "DYNAMIC_FIXED_ORIENTATION",
                            "IMPOSED_MESH"
                          ]
                        },
                        "maxMeshLength": {
                          "description": "Max mesh length in m. In case of WLG, will be converted in cells number. Empty only in case of monopass ProgR or With IMPOSED_MESH split method.",
                          "type": "number"
                        },
                        "cap": {
                          "description": "Direction of split, in case of dynamic split only, empty otherwise. \nDirection of the bearing. In degrees. \nBearing will depend if the tasking satellite is ascending or descending. 0 degrees correspond to a North/South or South/North acquisition",
                          "type": "number"
                        },
                        "overlapMarginAlongTrack": {
                          "description": "Overlapping length margin between meshes, used to split the ProgR in case of dynamic split only(in m), empty Otherwise.",
                          "type": "number"
                        },
                        "overlapMarginAcrossTrack": {
                          "description": "Overlapping width margin between meshes, used to split the ProgR in case of dynamic split only(in m), empty otherwise.",
                          "type": "number"
                        },
                        "missionParameters": {
                          "description": "Mission specific parameters",
                          "type": "object"
                        }
                      }
                    },
                    "acquisitionParameters": {
                      "description": "AcquisitionParameters definitions",
                      "title": "Acquisition Parameters object definition",
                      "type": "object",
                      "additionalProperties": false,
                      "properties": {
                        "acquisitionType": {
                          "description": "The type of acquisition (standard, astral,...)",
                          "type": "string"
                        },
                        "mode": {
                          "description": "Programming request acquisition mode.",
                          "type": "string",
                          "enum": [
                            "MONOSCOPIC",
                            "STEREO",
                            "TRISTEREO",
                            "QUADRISTEREO",
                            "N_UPLET"
                          ]
                        },
                        "monopass": {
                          "description": "Indicates if the Programming request is monopass.",
                          "type": "boolean"
                        },
                        "stereoType": {
                          "description": "Type of stereo mode, in case of stereo or tri-stereo acquisition mode only, empty otherwise.",
                          "type": "string",
                          "enum": [
                            "QUASI_SYMETRICAL",
                            "FORWARD_BACKWARD"
                          ]
                        },
                        "luminosityThreshold": {
                          "description": "Acceptable solar elevation angle for luminosity threshold. Not set (Empty) means CSS value is used by Mission algorithms, \n0 value means no luminosity constraint checks by mission algorithms\nSolar elevation angle for luminosity threshold",
                          "type": "number",
                          "minimum": 0,
                          "maximum": 90
                        },
                        "orbitalPhase": {
                          "description": "Indicates if the acquisition shall be done during the day or the night.",
                          "type": "string",
                          "enum": [
                            "DAY",
                            "NIGHT"
                          ]
                        },
                        "guidanceMode": {
                          "description": "Gives the guidance method to use.",
                          "type": "string",
                          "pattern": "^[A-Za-z0-9 !\\\"#$%&'*+,-./:;<=>?@^_`(|)~]{1,500}$"
                        },
                        "nUpletAcquisitionsNumber": {
                          "description": "Number of acquisitions, in case of n-uplet acquisition mode only, empty otherwise. All of these N acquisitions Must be taken during the same orbit.",
                          "type": "integer"
                        },
                        "missionParameters": {
                          "description": "Mission specific parameters",
                          "type": "object"
                        }
                      }
                    },
                    "downloadParameters": {
                      "description": "DownloadParameters definitions",
                      "title": "Download Parameters object definition",
                      "type": "object",
                      "additionalProperties": false,
                      "properties": {
                        "downloadBranches": {
                          "description": "Download branch list",
                          "type": "array",
                          "items": {
                            "$ref": "#/components/schemas/userRequestSubmitted/allOf/1/properties/programmingRequests/items/definitions/downloadBranch"
                          }
                        },
                        "missionParameters": {
                          "description": "Mission specific parameters",
                          "type": "object"
                        }
                      }
                    },
                    "downloadBranch": {
                      "description": "DownloadBranch definitions",
                      "title": "Download Branch object definition",
                      "type": "object",
                      "additionalProperties": false,
                      "properties": {
                        "inventoryCenter": {
                          "description": "Identifier of the INVENTOY center",
                          "type": "string",
                          "pattern": "^[A-Za-z0-9]{3,4}$"
                        },
                        "stations": {
                          "description": "List of acronym of the download station for TMI",
                          "type": "array",
                          "items": {
                            "type": "string",
                            "pattern": "^[A-Za-z0-9]{3,4}$"
                          }
                        },
                        "validating": {
                          "description": "Indicates whether the download branch is a validating one or not",
                          "type": "boolean"
                        },
                        "missionParameters": {
                          "description": "Mission specific parameters",
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              },
              "coverageCompletion": {
                "description": "The real User request coverage progression computed over time with follow-up. Represents the % of the AOI acquired over time",
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/getUserRequestsResponse/items/properties/coverageCompletion/items"
                }
              }
            },
            "required": [
              "guid"
            ]
          }
        ]
      },
      "udateProgrammingRequest": {
        "$id": "UpdateUserRequest.json",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "UpdateUserRequest",
        "additionalProperties": false,
        "description": "The UpdateUserRequest interface definition. Only two attributes can be updated: priority and clearSkyRejectionThreshold.",
        "definitions": {
          "userRequestParameters": {
            "title": "User request parameters object definition",
            "description": "Specific user request parameters for a mission",
            "properties": {
              "constellation": {
                "type": "string"
              },
              "clearSkyRejectionSelectionThreshold": {
                "description": "minimum forecast clear sky percentage for programming the request (in %)",
                "type": "number"
              },
              "clearSkyRejectionValidationThreshold": {
                "description": "minimum forecast clear sky percentage for programming the request (in %)",
                "type": "number"
              },
              "priority": {
                "description": "Describe the priority of the programming request. 1 is the greatest priority",
                "type": "integer",
                "minimum": 1,
                "maximum": 16
              }
            }
          }
        },
        "properties": {
          "guid": {
            "description": "The User Request identified by its guid",
            "type": "string"
          },
          "priority": {
            "description": "The priority to update",
            "type": "integer"
          },
          "userRequestMissionParameters": {
            "type": "array",
            "description": "The User Request parameters for a given mission",
            "items": {
              "$ref": "#/components/schemas/udateProgrammingRequest/definitions/userRequestParameters"
            }
          }
        },
        "required": [
          "guid"
        ]
      }
    }
  }
}