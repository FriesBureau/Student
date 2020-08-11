export class ProjectDashboardDb
{
    public static projects = [
        {
            'name': 'ACME Corp. Backend App'
        },
        {
            'name': 'ACME Corp. Frontend App'
        },
        {
            'name': 'Creapond'
        },
        {
            'name': 'Withinpixels'
        }
    ];

    public static widgets = {
        'widget1'      : {
            'ranges'      : {
                'DY' : 'Yesterday',
                'DT' : 'Today',
                'DTM': 'Tomorrow'
            },
            'currentRange': 'DT',
            'data'        : {
                'label': 'DUE TASKS',
                'count': {
                    'DY' : 21,
                    'DT' : 25,
                    'DTM': 19
                },
                'extra': {
                    'label': 'Completed',
                    'count': {
                        'DY' : 6,
                        'DT' : 7,
                        'DTM': '-'
                    }

                }
            },
            'detail'      : 'You can show some detailed information about this widget in here.'
        },
        'widget2'      : {
            'title' : 'Overdue',
            'data'  : {
                'label': 'OVERDUE TASKS',
                'count': 4,
                'extra': {
                    'label': 'Yesterday\'s overdue',
                    'count': 2
                }
            },
            'detail': 'You can show some detailed information about this widget in here.'
        },
        'widget3'      : {
            'title' : 'Rejected',
            'data'  : {
                'label': 'REJECTED TASKS',
                'count': 32,
                'extra': {
                    'label': 'Rejected today',
                    'count': 0
                }
            },
            'detail': 'You can show some detailed information about this widget in here.'
        },
        'widget4'      : {
            'title' : 'Future',
            'data'  : {
                'label': 'TASK SUGGESTIONS',
                'count': 42,
                'extra': {
                    'label': 'Ready',
                    'count': 8
                }
            },
            'detail': 'You can show some detailed information about this widget in here.'
        },
        'widget5'      : {
            'title'     : 'Tasks Completed / Open',
            'ranges'    : {
                'TW': 'This Week',
                'LW': 'Last Week',
                '2W': '2 Weeks Ago'
            },
            'mainChart' : {
                '2W': [
                    {
                        'name'  : 'Mon',
                        'series': [
                            {
                                'name' : 'completed',
                                'value': 37
                            },
                            {
                                'name' : 'open',
                                'value': 9
                            }
                        ]
                    },
                    {
                        'name'  : 'Tue',
                        'series': [
                            {
                                'name' : 'completed',
                                'value': 32
                            },
                            {
                                'name' : 'open',
                                'value': 12
                            }
                        ]
                    },
                    {
                        'name'  : 'Wed',
                        'series': [
                            {
                                'name' : 'completed',
                                'value': 39
                            },
                            {
                                'name' : 'open',
                                'value': 9
                            }
                        ]
                    },
                    {
                        'name'  : 'Thu',
                        'series': [
                            {
                                'name' : 'completed',
                                'value': 27
                            },
                            {
                                'name' : 'open',
                                'value': 12
                            }
                        ]
                    },
                    {
                        'name'  : 'Fri',
                        'series': [
                            {
                                'name' : 'completed',
                                'value': 18
                            },
                            {
                                'name' : 'open',
                                'value': 7
                            }
                        ]
                    },
                    {
                        'name'  : 'Sat',
                        'series': [
                            {
                                'name' : 'completed',
                                'value': 24
                            },
                            {
                                'name' : 'open',
                                'value': 8
                            }
                        ]
                    },
                    {
                        'name'  : 'Sun',
                        'series': [
                            {
                                'name' : 'completed',
                                'value': 20
                            },
                            {
                                'name' : 'open',
                                'value': 16
                            }
                        ]
                    }
                ],
                'LW': [
                    {
                        'name'  : 'Mon',
                        'series': [
                            {
                                'name' : 'completed',
                                'value': 37
                            },
                            {
                                'name' : 'open',
                                'value': 12
                            }
                        ]
                    },
                    {
                        'name'  : 'Tue',
                        'series': [
                            {
                                'name' : 'completed',
                                'value': 24
                            },
                            {
                                'name' : 'open',
                                'value': 8
                            }
                        ]
                    },
                    {
                        'name'  : 'Wed',
                        'series': [
                            {
                                'name' : 'completed',
                                'value': 51
                            },
                            {
                                'name' : 'open',
                                'value': 7
                            }
                        ]
                    },
                    {
                        'name'  : 'Thu',
                        'series': [
                            {
                                'name' : 'completed',
                                'value': 31
                            },
                            {
                                'name' : 'open',
                                'value': 13
                            }
                        ]
                    },
                    {
                        'name'  : 'Fri',
                        'series': [
                            {
                                'name' : 'completed',
                                'value': 29
                            },
                            {
                                'name' : 'open',
                                'value': 7
                            }
                        ]
                    },
                    {
                        'name'  : 'Sat',
                        'series': [
                            {
                                'name' : 'completed',
                                'value': 17
                            },
                            {
                                'name' : 'open',
                                'value': 6
                            }
                        ]
                    },
                    {
                        'name'  : 'Sun',
                        'series': [
                            {
                                'name' : 'completed',
                                'value': 31
                            },
                            {
                                'name' : 'open',
                                'value': 10
                            }
                        ]
                    }
                ],
                'TW': [
                    {
                        'name'  : 'Mon',
                        'series': [
                            {
                                'name' : 'completed',
                                'value': 42
                            },
                            {
                                'name' : 'open',
                                'value': 11
                            }
                        ]
                    },
                    {
                        'name'  : 'Tue',
                        'series': [
                            {
                                'name' : 'completed',
                                'value': 28
                            },
                            {
                                'name' : 'open',
                                'value': 10
                            }
                        ]
                    },
                    {
                        'name'  : 'Wed',
                        'series': [
                            {
                                'name' : 'completed',
                                'value': 43
                            },
                            {
                                'name' : 'open',
                                'value': 8
                            }
                        ]
                    },
                    {
                        'name'  : 'Thu',
                        'series': [
                            {
                                'name' : 'completed',
                                'value': 34
                            },
                            {
                                'name' : 'open',
                                'value': 11
                            }
                        ]
                    },
                    {
                        'name'  : 'Fri',
                        'series': [
                            {
                                'name' : 'completed',
                                'value': 20
                            },
                            {
                                'name' : 'open',
                                'value': 8
                            }
                        ]
                    },
                    {
                        'name'  : 'Sat',
                        'series': [
                            {
                                'name' : 'completed',
                                'value': 25
                            },
                            {
                                'name' : 'open',
                                'value': 10
                            }
                        ]
                    },
                    {
                        'name'  : 'Sun',
                        'series': [
                            {
                                'name' : 'completed',
                                'value': 22
                            },
                            {
                                'name' : 'open',
                                'value': 17
                            }
                        ]
                    }
                ]
            },
            'supporting': {
                'created'  : {
                    'label': 'COMPLETED',
                    'count': {
                        '2W': 48,
                        'LW': 46,
                        'TW': 54
                    },
                    'chart': {
                        '2W': [
                            {
                                'name'  : 'COMPLETED',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 8
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 6
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 7
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 8
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 7
                                    }
                                ]
                            }
                        ],
                        'LW': [
                            {
                                'name'  : 'Completed',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 6
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 3
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 7
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 7
                                    }
                                ]
                            }
                        ],
                        'TW': [
                            {
                                'name'  : 'Completed',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 3
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 2
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 1
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 8
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 8
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 4
                                    }
                                ]
                            }
                        ]
                    }
                },
                'open'   : {
                    'label': 'OPEN',
                    'count': {
                        '2W': 27,
                        'LW': 31,
                        'TW': 26
                    },
                    'chart': {
                        '2W': [
                            {
                                'name'  : 'OPEN',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 3
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 2
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 1
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 8
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 8
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 4
                                    }
                                ]
                            }
                        ],
                        'LW': [
                            {
                                'name'  : 'OPEN',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 6
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 7
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 7
                                    }
                                ]
                            }
                        ],
                        'TW': [
                            {
                                'name'  : 'OPEN',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 6
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 3
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 7
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 7
                                    }
                                ]
                            }
                        ]
                    }
                },
                'reOpened' : {
                    'label': 'RE-OPENED',
                    'count': {
                        '2W': 4,
                        'LW': 5,
                        'TW': 2
                    },
                    'chart': {
                        '2W': [
                            {
                                'name'  : 'RE-OPENED',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 6
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 3
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 7
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 7
                                    }
                                ]
                            }
                        ],
                        'LW': [
                            {
                                'name'  : 'RE-OPENED',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 7
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 8
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 8
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 6
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 1
                                    }
                                ]
                            }
                        ],
                        'TW': [
                            {
                                'name'  : 'RE-OPENED',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 3
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 2
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 1
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 8
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 8
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 4
                                    }
                                ]
                            }
                        ]
                    }
                },
                'notcompleted'  : {
                    'label': 'NOT COMPLETED',
                    'count': {
                        '2W': 6,
                        'LW': 3,
                        'TW': 4
                    },
                    'chart': {
                        '2W': [
                            {
                                'name'  : 'NOT COMPLETED',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 7
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 6
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 3
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 2
                                    }
                                ]
                            }
                        ],
                        'LW': [
                            {
                                'name'  : 'NOT COMPLETED',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 6
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 3
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 7
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 7
                                    }
                                ]
                            }
                        ],
                        'TW': [
                            {
                                'name'  : 'NOT COMPLETED',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 6
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 7
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 7
                                    }
                                ]
                            }
                        ]
                    }
                },
                'needsTest': {
                    'label': 'NEEDS REVIEW',
                    'count': {
                        '2W': 10,
                        'LW': 7,
                        'TW': 8
                    },
                    'chart': {
                        '2W': [
                            {
                                'name'  : 'NEEDS REVIEW',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 6
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 7
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 7
                                    }
                                ]
                            }
                        ],
                        'LW': [
                            {
                                'name'  : 'NEEDS REVIEW',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 7
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 8
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 8
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 6
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 1
                                    }
                                ]
                            }
                        ],
                        'TW': [
                            {
                                'name'  : 'NEEDS REVIEW',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 6
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 3
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 7
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 7
                                    }
                                ]
                            }
                        ]
                    }
                },
                'rejected'    : {
                    'label': 'REJECTED',
                    'count': {
                        '2W': 21,
                        'LW': 17,
                        'TW': 14
                    },
                    'chart': {
                        '2W': [
                            {
                                'name'  : 'REJECTED',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 7
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 8
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 8
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 6
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 1
                                    }
                                ]
                            }
                        ],
                        'LW': [
                            {
                                'name'  : 'REJECTED',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 6
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 7
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 7
                                    }
                                ]
                            }
                        ],
                        'TW': [
                            {
                                'name'  : 'REJECTED',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 7
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 6
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 3
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 2
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        },
        'widget6'      : {
            'title'      : 'Task Distribution',
            'ranges'     : {
                'TW': 'This Week',
                'LW': 'Last Week',
                '2W': '2 Weeks Ago'
            },
            'mainChart'  : {
                'TW': [
                    {
                        'name' : 'Speak',
                        'value': 15
                    },
                    {
                        'name' : 'Grammar',
                        'value': 20
                    },
                    {
                        'name' : 'Writing',
                        'value': 38
                    },
                    {
                        'name' : 'Quiz',
                        'value': 27
                    }
                ],
                'LW': [
                    {
                        'name' : 'Speak',
                        'value': 19
                    },
                    {
                        'name' : 'Grammar',
                        'value': 16
                    },
                    {
                        'name' : 'Writing',
                        'value': 42
                    },
                    {
                        'name' : 'Quiz',
                        'value': 23
                    }
                ],
                '2W': [
                    {
                        'name' : 'Speak',
                        'value': 18
                    },
                    {
                        'name' : 'Grammar',
                        'value': 17
                    },
                    {
                        'name' : 'Writing',
                        'value': 40
                    },
                    {
                        'name' : 'Quiz',
                        'value': 25
                    }
                ]
            },
            'footerLeft' : {
                'title': 'Tasks Started',
                'count': {
                    '2W': 487,
                    'LW': 526,
                    'TW': 594
                }
            },
            'footerRight': {
                'title': 'Tasks Completed',
                'count': {
                    '2W': 193,
                    'LW': 260,
                    'TW': 287
                }
            }
        },
        'widget7'      : {
            'title'   : 'Schedule',
            'ranges'  : {
                'T' : 'Today',
                'TM': 'Tomorrow'
            },
            'schedule': {
                'T' : [
                    {
                        'title'   : 'Group Meeting',
                        'time'    : 'In 32 minutes',
                        'location': 'Room 1B',
                        'lesson' : 'Lesson 5'
                    },
                    {
                        'title': 'Coffee Break',
                        'time' : '10:30 AM',
                        'lesson' : 'Lesson 7'
                    },
                    {
                        'title': 'Public Beta Release',
                        'time' : '11:00 AM'
                    },
                    {
                        'title': 'Lunch',
                        'time' : '12:10 PM'
                    },
                    {
                        'title': 'Dinner with David',
                        'time' : '17:30 PM'
                    },
                    {
                        'title': 'Jane\'s Birthday Party',
                        'time' : '19:30 PM'
                    },
                    {
                        'title': 'Overseer\'s Retirement Party',
                        'time' : '21:30 PM'
                    }
                ],
                'TM': [
                    {
                        'title': 'Marketing Meeting',
                        'time' : '09:00 AM'
                    },
                    {
                        'title': 'Public Announcement',
                        'time' : '11:00 AM'
                    },
                    {
                        'title': 'Lunch',
                        'time' : '12:10 PM'
                    },
                    {
                        'title': 'Meeting with Beta Testers',
                        'time' : '15:00 AM'
                    },
                    {
                        'title': 'Live Stream',
                        'time' : '17:30 PM'
                    },
                    {
                        'title': 'Release Party',
                        'time' : '19:30 PM'
                    },
                    {
                        'title': 'CEO\'s Party',
                        'time' : '22:30 PM'
                    }
                ]
            }
        },
        'widget8'      : {
            'title'    : 'Effort Distribution',
            'mainChart': [
                {
                    'name' : 'Speak',
                    'value': 12
                },
                {
                    'name' : 'Grammar',
                    'value': 17
                },
                {
                    'name' : 'Writing',
                    'value': 28
                },
                {
                    'name' : 'Quiz',
                    'value': 25
                },
                {
                    'name' : 'Extra',
                    'value': 15
                }
            ]
        },
        'widget9'      : {
            'title'         : 'Output - Skill level development',
            'ranges'        : {
                'TW': 'This Week',
                'LW': 'Last Week',
                '2W': '2 Weeks Ago'
            },
            'weeklySpent'   : {
                'title': 'Time spent',
                'count': {
                    '2W': '2,682.85',
                    'LW': '1,445.34',
                    'TW': '3,630.15'
                },
                'chart': {
                    '2W': [
                        {
                            'name'  : 'Tasks',
                            'series': [
                                {
                                    'name' : 'Mon',
                                    'value': 6
                                },
                                {
                                    'name' : 'Tue',
                                    'value': 1
                                },
                                {
                                    'name' : 'Wed',
                                    'value': 3
                                },
                                {
                                    'name' : 'Thu',
                                    'value': 4
                                },
                                {
                                    'name' : 'Fri',
                                    'value': 5
                                },
                                {
                                    'name' : 'Sat',
                                    'value': 5
                                },
                                {
                                    'name' : 'Sun',
                                    'value': 2
                                }
                            ]
                        }
                    ],
                    'LW': [
                        {
                            'name'  : 'Tasks',
                            'series': [
                                {
                                    'name' : 'Mon',
                                    'value': 4
                                },
                                {
                                    'name' : 'Tue',
                                    'value': 6
                                },
                                {
                                    'name' : 'Wed',
                                    'value': 2
                                },
                                {
                                    'name' : 'Thu',
                                    'value': 2
                                },
                                {
                                    'name' : 'Fri',
                                    'value': 1
                                },
                                {
                                    'name' : 'Sat',
                                    'value': 3
                                },
                                {
                                    'name' : 'Sun',
                                    'value': 4
                                }
                            ]
                        }
                    ],
                    'TW': [
                        {
                            'name'  : 'Tasks',
                            'series': [
                                {
                                    'name' : 'Mon',
                                    'value': 2
                                },
                                {
                                    'name' : 'Tue',
                                    'value': 6
                                },
                                {
                                    'name' : 'Wed',
                                    'value': 5
                                },
                                {
                                    'name' : 'Thu',
                                    'value': 4
                                },
                                {
                                    'name' : 'Fri',
                                    'value': 5
                                },
                                {
                                    'name' : 'Sat',
                                    'value': 3
                                },
                                {
                                    'name' : 'Sun',
                                    'value': 6
                                }
                            ]
                        }
                    ]
                }
            },
            'totalSpent'    : {
                'title': 'Level',
                'count': {
                    '2W': '29,682.85',
                    'LW': '31,128.19',
                    'TW': '34,758.34'
                },
                'chart': {
                    '2W': [
                        {
                            'name'  : 'Level',
                            'series': [
                                {
                                    'name' : 'Mon',
                                    'value': 3
                                },
                                {
                                    'name' : 'Tue',
                                    'value': 2
                                },
                                {
                                    'name' : 'Wed',
                                    'value': 2
                                },
                                {
                                    'name' : 'Thu',
                                    'value': 4
                                },
                                {
                                    'name' : 'Fri',
                                    'value': 7
                                },
                                {
                                    'name' : 'Sat',
                                    'value': 7
                                },
                                {
                                    'name' : 'Sun',
                                    'value': 4
                                }
                            ]
                        }
                    ],
                    'LW': [
                        {
                            'name'  : 'Level',
                            'series': [
                                {
                                    'name' : 'Mon',
                                    'value': 5
                                },
                                {
                                    'name' : 'Tue',
                                    'value': 7
                                },
                                {
                                    'name' : 'Wed',
                                    'value': 8
                                },
                                {
                                    'name' : 'Thu',
                                    'value': 8
                                },
                                {
                                    'name' : 'Fri',
                                    'value': 6
                                },
                                {
                                    'name' : 'Sat',
                                    'value': 4
                                },
                                {
                                    'name' : 'Sun',
                                    'value': 1
                                }
                            ]
                        }
                    ],
                    'TW': [
                        {
                            'name'  : 'Skill Level',
                            'series': [
                                {
                                    'name' : 'Mon',
                                    'value': 6
                                },
                                {
                                    'name' : 'Tue',
                                    'value': 4
                                },
                                {
                                    'name' : 'Wed',
                                    'value': 7
                                },
                                {
                                    'name' : 'Thu',
                                    'value': 5
                                },
                                {
                                    'name' : 'Fri',
                                    'value': 5
                                },
                                {
                                    'name' : 'Sat',
                                    'value': 4
                                },
                                {
                                    'name' : 'Sun',
                                    'value': 7
                                }
                            ]
                        }
                    ]
                }
            },
            'remaining'     : {
                'title': 'Remaining time to reach next level',
                'count': {
                    '2W': '02hrs:50min',
                    'LW': '01hrs:35min',
                    'TW': '05hrs:05min'
                },
                'chart': {
                    '2W': [
                        {
                            'name'  : 'CREATED',
                            'series': [
                                {
                                    'name' : 'Mon',
                                    'value': 1
                                },
                                {
                                    'name' : 'Tue',
                                    'value': 4
                                },
                                {
                                    'name' : 'Wed',
                                    'value': 5
                                },
                                {
                                    'name' : 'Thu',
                                    'value': 7
                                },
                                {
                                    'name' : 'Fri',
                                    'value': 8
                                },
                                {
                                    'name' : 'Sat',
                                    'value': 2
                                },
                                {
                                    'name' : 'Sun',
                                    'value': 4
                                }
                            ]
                        }
                    ],
                    'LW': [
                        {
                            'name'  : 'Tasks',
                            'series': [
                                {
                                    'name' : 'Mon',
                                    'value': 3
                                },
                                {
                                    'name' : 'Tue',
                                    'value': 2
                                },
                                {
                                    'name' : 'Wed',
                                    'value': 1
                                },
                                {
                                    'name' : 'Thu',
                                    'value': 4
                                },
                                {
                                    'name' : 'Fri',
                                    'value': 8
                                },
                                {
                                    'name' : 'Sat',
                                    'value': 8
                                },
                                {
                                    'name' : 'Sun',
                                    'value': 4
                                }
                            ]
                        }
                    ],
                    'TW': [
                        {
                            'name'  : 'Created',
                            'series': [
                                {
                                    'name' : 'Mon',
                                    'value': 2
                                },
                                {
                                    'name' : 'Tue',
                                    'value': 4
                                },
                                {
                                    'name' : 'Wed',
                                    'value': 8
                                },
                                {
                                    'name' : 'Thu',
                                    'value': 6
                                },
                                {
                                    'name' : 'Fri',
                                    'value': 2
                                },
                                {
                                    'name' : 'Sat',
                                    'value': 5
                                },
                                {
                                    'name' : 'Sun',
                                    'value': 1
                                }
                            ]
                        }
                    ]
                }
            },
            'totalRemaining': {
                'title': 'Remaining time to reach next level ',
                'count': '05hrs:35min'
            },
            'totalBudget'   : {
                'title': 'Investment return ratio - time vs. skill',
                'count': '1:5'
            }
        },
        'widget10'     : {
            'title': 'Lessons and tasks',
            'table': {
                'columns': [
                    {
                        'title': 'Lesson'
                    },
                    {
                        'title': 'Task'
                    },
                    {
                        'title': 'Score'
                    },
                    {
                        'title': 'Time spent'
                    },
                    {
                        'title': 'Correct'
                    },
                    {
                        'title': 'Wrong'
                    }
                ],
                'rows'   : [
                    [
                        {
                            'value'  : 'Wireframing',
                            'classes': 'primary',
                            'icon'   : ''
                        },
                        {
                            'value'  : '$14,880.00',
                            'classes': 'text-bold',
                            'icon'   : ''
                        },
                        {
                            'value'  : '$14,000.00',
                            'classes': '',
                            'icon'   : ''
                        },
                        {
                            'value'  : '%94.08',
                            'classes': 'text-success',
                            'icon'   : 'trending_up'
                        },
                        {
                            'value'  : '$880.00',
                            'classes': '',
                            'icon'   : ''
                        },
                        {
                            'value'  : '%5.92',
                            'classes': '',
                            'icon'   : ''
                        }
                    ],
                    [
                        {
                            'value'  : 'Design',
                            'classes': 'green',
                            'icon'   : ''
                        },
                        {
                            'value'  : '$21,080.00',
                            'classes': 'text-bold',
                            'icon'   : ''
                        },
                        {
                            'value'  : '$17,240.34',
                            'classes': '',
                            'icon'   : ''
                        },
                        {
                            'value'  : '%81.78',
                            'classes': 'text-success',
                            'icon'   : 'trending_up'
                        },
                        {
                            'value'  : '$3,839.66',
                            'classes': '',
                            'icon'   : ''
                        },
                        {
                            'value'  : '%18.22',
                            'classes': '',
                            'icon'   : ''
                        }
                    ],
                    [
                        {
                            'value'  : 'Coding',
                            'classes': 'red',
                            'icon'   : ''
                        },
                        {
                            'value'  : '$34,720.00',
                            'classes': 'text-bold',
                            'icon'   : ''
                        },
                        {
                            'value'  : '$3,518.00',
                            'classes': '',
                            'icon'   : ''
                        },
                        {
                            'value'  : '%10.13',
                            'classes': 'text-danger',
                            'icon'   : 'trending_down'
                        },
                        {
                            'value'  : '$31,202.00',
                            'classes': '',
                            'icon'   : ''
                        },
                        {
                            'value'  : '%89.87',
                            'classes': '',
                            'icon'   : ''
                        }
                    ],
                    [
                        {
                            'value'  : 'Marketing',
                            'classes': 'accent',
                            'icon'   : ''
                        },
                        {
                            'value'  : '$34,720.00',
                            'classes': 'text-bold',
                            'icon'   : ''
                        },
                        {
                            'value'  : '$0.00',
                            'classes': '',
                            'icon'   : ''
                        },
                        {
                            'value'  : '%0.00',
                            'classes': 'text-info',
                            'icon'   : 'trending_flat'
                        },
                        {
                            'value'  : '$34,720.00',
                            'classes': '',
                            'icon'   : ''
                        },
                        {
                            'value'  : '%100.00',
                            'classes': '',
                            'icon'   : ''
                        }
                    ],
                    [
                        {
                            'value'  : 'Extra',
                            'classes': 'orange',
                            'icon'   : ''
                        },
                        {
                            'value'  : '$18,600.00',
                            'classes': 'text-bold',
                            'icon'   : ''
                        },
                        {
                            'value'  : '$0.00',
                            'classes': '',
                            'icon'   : ''
                        },
                        {
                            'value'  : '%0.00',
                            'classes': 'text-info',
                            'icon'   : 'trending_flat'
                        },
                        {
                            'value'  : '$34,720.00',
                            'classes': '',
                            'icon'   : ''
                        },
                        {
                            'value'  : '%100.00',
                            'classes': '',
                            'icon'   : ''
                        }
                    ]
                ]
            }
        },
        'widget11'     : {
            'title': 'Team Members',
            'table': {
                'columns': ['avatar', 'name', 'position', 'office', 'email', 'phone'],
                'rows'   : [
                    {
                        avatar  : 'assets/images/avatars/james.jpg',
                        name    : 'Jack Gilbert',
                        position: 'Design Manager',
                        office  : 'Johor Bahru',
                        email   : 'jgilbert48@mail.com',
                        phone   : '+16 298 032 7774'
                    },
                    {
                        avatar  : 'assets/images/avatars/katherine.jpg',
                        name    : 'Kathy Anderson',
                        position: 'Recruiting Manager',
                        office  : 'Solţānābād',
                        email   : 'kanderson49@mail.com.br',
                        phone   : '+23 572 311 1136'
                    },
                    {
                        avatar  : 'assets/images/avatars/andrew.jpg',
                        name    : 'Mark Turner',
                        position: 'Recruiting Manager',
                        office  : 'Neftegorsk',
                        email   : 'mturner4a@mail.com',
                        phone   : '+01 139 803 9263'
                    },
                    {
                        avatar  : 'assets/images/avatars/jane.jpg',
                        name    : 'Kathryn Martinez',
                        position: 'Director of Sales',
                        office  : 'Palekastro',
                        email   : 'kmartinez4b@mail.com',
                        phone   : '+25 467 022 5393'
                    },
                    {
                        avatar  : 'assets/images/avatars/alice.jpg',
                        name    : 'Annie Gonzales',
                        position: 'Actuary',
                        office  : 'Candon',
                        email   : 'agonzales4c@mail.edu',
                        phone   : '+99 891 619 7138'
                    },
                    {
                        avatar  : 'assets/images/avatars/vincent.jpg',
                        name    : 'Howard King',
                        position: 'Human Resources',
                        office  : 'Bergen op Zoom',
                        email   : 'hking4d@mail.gov',
                        phone   : '+46 984 348 1409'
                    },
                    {
                        avatar  : 'assets/images/avatars/joyce.jpg',
                        name    : 'Elizabeth Dixon',
                        position: 'Electrical Engineer',
                        office  : 'Písečná',
                        email   : 'edixon4e@mail.gov',
                        phone   : '+33 332 067 9063'
                    },
                    {
                        avatar  : 'assets/images/avatars/danielle.jpg',
                        name    : 'Dorothy Morris',
                        position: 'Office Assistant',
                        office  : 'Magsaysay',
                        email   : 'dmorris4f@mail.com',
                        phone   : '+05 490 958 6120'
                    },
                    {
                        avatar  : 'assets/images/avatars/carl.jpg',
                        name    : 'Mark Gonzales',
                        position: 'Quality Control',
                        office  : 'Matsue-shi',
                        email   : 'mgonzales4g@mail.com',
                        phone   : '+03 168 394 9935'
                    },
                    {
                        avatar  : 'assets/images/avatars/profile.jpg',
                        name    : 'Catherine Rogers',
                        position: 'Programmer Analyst',
                        office  : 'Kangar',
                        email   : 'crogers4h@mail.com',
                        phone   : '+86 235 407 5373'
                    },
                    {
                        avatar  : 'assets/images/avatars/garry.jpg',
                        name    : 'Ruth Grant',
                        position: 'Community Outreach',
                        office  : 'Beaune',
                        email   : 'rgrant4i@mail.pl',
                        phone   : '+36 288 083 8460'
                    },
                    {
                        avatar  : 'assets/images/avatars/james.jpg',
                        name    : 'Phyllis Gutierrez',
                        position: 'Administrative Assistant',
                        office  : 'Shlissel’burg',
                        email   : 'pgutierrez4j@mail.net',
                        phone   : '+52 749 861 9304'
                    }, {
                        avatar  : 'assets/images/avatars/alice.jpg',
                        name    : 'Lillian Morris',
                        position: 'Media Planner',
                        office  : 'Berlin',
                        email   : 'lmorris4k@mail.de',
                        phone   : '+59 695 110 3856'
                    }, {
                        avatar  : 'assets/images/avatars/vincent.jpg',
                        name    : 'Jeremy Anderson',
                        position: 'Systems Engineer',
                        office  : 'Lũng Hồ',
                        email   : 'janderson4l@mail.uk',
                        phone   : '+40 384 115 1448'
                    },
                    {
                        avatar  : 'assets/images/avatars/carl.jpg',
                        name    : 'Arthur Lawrence',
                        position: 'Nurse Practicioner',
                        office  : 'Sarkanjut',
                        email   : 'alawrence4m@mail.com',
                        phone   : '+36 631 599 7867'
                    }, {
                        avatar  : 'assets/images/avatars/andrew.jpg',
                        name    : 'David Simmons',
                        position: 'Social Worker',
                        office  : 'Ushumun',
                        email   : 'dsimmons4n@mail.com',
                        phone   : '+01 189 681 4417'
                    }, {
                        avatar  : 'assets/images/avatars/danielle.jpg',
                        name    : 'Daniel Johnston',
                        position: 'Help Desk',
                        office  : 'São Carlos',
                        email   : 'djohnston4o@mail.gov',
                        phone   : '+60 028 943 7919'
                    },

                    {
                        avatar  : 'assets/images/avatars/joyce.jpg',
                        name    : 'Ann King',
                        position: 'Internal Auditor',
                        office  : 'Liren',
                        email   : 'aking4p@mail.com',
                        phone   : '+91 103 932 6545'
                    },
                    {
                        avatar  : 'assets/images/avatars/james.jpg',
                        name    : 'Phillip Franklin',
                        position: 'VP Accounting',
                        office  : 'Soba',
                        email   : 'pfranklin4q@mail.com',
                        phone   : '+25 820 986 7626'
                    },
                    {
                        avatar  : 'assets/images/avatars/garry.jpg',
                        name    : 'Gary Gonzalez',
                        position: 'Speech Pathologist',
                        office  : 'Gangkou',
                        email   : 'ggonzalez4r@mail.cc',
                        phone   : '+10 862 046 7916'
                    }
                ]
            }
        },
        'weatherWidget': {
            'locations'      : {
                'NewYork': {
                    'name'           : 'Copenhagen',
                    'icon'           : 'icon-rainy2',
                    'temp'           : {
                        'C': '22',
                        'F': '72'
                    },
                    'windSpeed'      : {
                        'KMH': 12,
                        'MPH': 7.5
                    },
                    'windDirection'  : 'NW',
                    'rainProbability': '98%',
                    'next3Days'      : [
                        {
                            'name': 'Sunday',
                            'icon': 'icon-rainy',
                            'temp': {
                                'C': '21',
                                'F': '70'
                            }
                        },
                        {
                            'name': 'Sunday',
                            'icon': 'icon-cloudy',
                            'temp': {
                                'C': '19',
                                'F': '66'
                            }
                        },
                        {
                            'name': 'Tuesday',
                            'icon': 'icon-windy3',
                            'temp': {
                                'C': '24',
                                'F': '75'
                            }
                        }
                    ]
                }
            },
            'currentLocation': 'NewYork',
            'tempUnit'       : 'C',
            'speedUnit'      : 'KMH'
        }
    };
}
