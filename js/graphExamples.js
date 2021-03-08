const EXAMPLE_GRAPHS = [
  {
    nodes: [
      {
        id: 0,
        label: 'A',
        x: 3,
        y: 7
      },
      {
        id: 1,
        label: 'B',
        x: 6,
        y: 3
      },
      {
        id: 2,
        label: 'C',
        x: 9,
        y: 3
      },
      {
        id: 3,
        label: 'D',
        x: 13,
        y: 3
      },
      {
        id: 4,
        label: 'E',
        x: 16,
        y: 7
      },
      {
        id: 5,
        label: 'F',
        x: 13,
        y: 11
      },
      {
        id: 6,
        label: 'G',
        x: 9,
        y: 11
      },
      {
        id: 7,
        label: 'H',
        x: 6,
        y: 11
      },
      {
        id: 8,
        label: 'I',
        x: 9,
        y: 7,
      }
    ],
    edges: [
      {
        start: 0,
        end: 1,
        weight: 4
      },
      {
        start: 0,
        end: 7,
        weight: 8
      },
      {
        start: 1,
        end: 2,
        weight: 8,
      },
      {
        start: 1,
        end: 7,
        weight: 11
      },
      {
        start: 2,
        end: 3,
        weight: 7
      },
      {
        start: 2,
        end: 5,
        weight: 4
      },
      {
        start: 2,
        end: 8,
        weight: 2
      },
      {
        start: 3,
        end: 4,
        weight: 9
      },
      {
        start: 3,
        end: 5,
        weight: 14
      },
      {
        start: 4,
        end: 5,
        weight: 10
      },
      {
        start: 5,
        end: 6,
        weight: 2
      },
      {
        start: 6,
        end: 7,
        weight: 1
      },
      {
        start: 6,
        end: 8,
        weight: 6
      },
      {
        start: 7,
        end: 8,
        weight: 7
      }
    ]
  },
  {
    nodes: [
      {
        id: 0,
        label: 'Dublin',
        x: 1,
        y: 7
      },
      {
        id: 1,
        label: 'Abu Dhabi',
        x: 5,
        y: 2
      },
      {
        id: 2,
        label: 'Brisbane',
        x: 13,
        y: 2
      },
      {
        id: 3,
        label: 'Hong Kong',
        x: 5,
        y: 6
      },
      {
        id: 4,
        label: 'Melbourne',
        x: 13,
        y: 6
      },
      {
        id: 5,
        label: 'Dubai',
        x: 5,
        y: 10
      },
      {
        id: 6,
        label: 'Sydney',
        x: 13,
        y: 10
      },
      {
        id: 7,
        label: 'Doha',
        x: 5,
        y: 13
      },
      {
        id: 8,
        label: 'Perth',
        x: 13,
        y: 13
      },
      {
        id: 9,
        label: 'Alice Springs',
        x: 18,
        y: 7
      }
    ],
    edges: [
      {
        start: 0,
        end: 1,
        weight: 472
      },
      {
        start: 0,
        end: 3,
        weight: 1168
      },
      {
        start: 0,
        end: 5,
        weight: 530
      },
      {
        start: 0,
        end: 7,
        weight: 820
      },
      {
        start: 1,
        end: 2,
        weight: 1296
      },
      {
        start: 1,
        end: 4,
        weight: 1285
      },
      {
        start: 3,
        end: 2,
        weight: 518
      },
      {
        start: 3,
        end: 4,
        weight: 592
      },
      {
        start: 3,
        end: 6,
        weight: 510
      },
      {
        start: 5,
        end: 6,
        weight: 1312
      },
      {
        start: 5,
        end: 8,
        weight: 1228
      },
      {
        start: 7,
        end: 6,
        weight: 1612
      },
      {
        start: 7,
        end: 8,
        weight: 1591
      },
      {
        start: 2,
        end: 9,
        weight: 457
      },
      {
        start: 4,
        end: 9,
        weight: 480
      },
      {
        start: 6,
        end: 9,
        weight: 401
      },
      {
        start: 8,
        end: 9,
        weight: 563
      }
    ]
  },
  {
    "nodes": [
      {
        "id": 0,
        "label": "Bishan",
        "x": 9,
        "y": 8
      },
      {
        "id": 1,
        "label": "Yishun",
        "x": 9,
        "y": 4
      },
      {
        "id": 4,
        "label": "Botanics",
        "x": 6,
        "y": 9
      },
      {
        "id": 5,
        "label": "Buona",
        "x": 5,
        "y": 12
      },
      {
        "id": 6,
        "label": "JE",
        "x": 3,
        "y": 10
      },
      {
        "id": 7,
        "label": "Boon Lay",
        "x": 0,
        "y": 11
      },
      {
        "id": 8,
        "label": "CCK",
        "x": 3,
        "y": 5
      },
      {
        "id": 9,
        "label": "Woodlands",
        "x": 6,
        "y": 1
      },
      {
        "id": 10,
        "label": "Serangoon",
        "x": 12,
        "y": 7
      },
      {
        "id": 11,
        "label": "Sengkang",
        "x": 13,
        "y": 2
      },
      {
        "id": 14,
        "label": "Tampines",
        "x": 18,
        "y": 5
      },
      {
        "id": 15,
        "label": "City Hall",
        "x": 11,
        "y": 12
      },
      {
        "id": 16,
        "label": "Outram",
        "x": 8,
        "y": 13
      },
      {
        "id": 17,
        "label": "Harbourfront",
        "x": 6,
        "y": 15
      },
      {
        "id": 18,
        "label": "Shenton",
        "x": 10,
        "y": 14
      },
      {
        "id": 19,
        "label": "Dhoby",
        "x": 9,
        "y": 11
      },
      {
        "id": 22,
        "label": "Bugis",
        "x": 12,
        "y": 11
      },
      {
        "id": 23,
        "label": "Paya Lebar",
        "x": 15,
        "y": 10
      },
      {
        "id": 24,
        "label": "Tanah Merah",
        "x": 17,
        "y": 9
      },
      {
        "id": 25,
        "label": "Expo",
        "x": 19,
        "y": 10
      },
      {
        "id": 26,
        "label": "MacPherson",
        "x": 14,
        "y": 8
      }
    ],
    "edges": [
      {
        "start": 0,
        "end": 1,
        "weight": 15
      },
      {
        "start": 1,
        "end": 9,
        "weight": 15
      },
      {
        "start": 9,
        "end": 8,
        "weight": 12
      },
      {
        "start": 0,
        "end": 19,
        "weight": 15
      },
      {
        "start": 19,
        "end": 15,
        "weight": 3
      },
      {
        "start": 19,
        "end": 10,
        "weight": 15
      },
      {
        "start": 11,
        "end": 10,
        "weight": 10
      },
      {
        "start": 0,
        "end": 10,
        "weight": 5
      },
      {
        "start": 15,
        "end": 18,
        "weight": 7
      },
      {
        "start": 16,
        "end": 18,
        "weight": 4
      },
      {
        "start": 17,
        "end": 16,
        "weight": 4
      },
      {
        "start": 5,
        "end": 17,
        "weight": 10
      },
      {
        "start": 5,
        "end": 16,
        "weight": 12
      },
      {
        "start": 5,
        "end": 4,
        "weight": 10
      },
      {
        "start": 4,
        "end": 0,
        "weight": 10
      },
      {
        "start": 4,
        "end": 8,
        "weight": 25
      },
      {
        "start": 5,
        "end": 6,
        "weight": 10
      },
      {
        "start": 6,
        "end": 7,
        "weight": 10
      },
      {
        "start": 6,
        "end": 8,
        "weight": 10
      },
      {
        "start": 22,
        "end": 15,
        "weight": 2
      },
      {
        "start": 22,
        "end": 23,
        "weight": 12
      },
      {
        "start": 23,
        "end": 24,
        "weight": 10
      },
      {
        "start": 24,
        "end": 25,
        "weight": 3
      },
      {
        "start": 24,
        "end": 14,
        "weight": 5
      },
      {
        "start": 14,
        "end": 25,
        "weight": 8
      },
      {
        "start": 4,
        "end": 22,
        "weight": 13
      },
      {
        "start": 10,
        "end": 26,
        "weight": 8
      },
      {
        "start": 26,
        "end": 23,
        "weight": 2
      },
      {
        "start": 26,
        "end": 14,
        "weight": 12
      },
      {
        "start": 16,
        "end": 19,
        "weight": 6
      }
    ]
  },
  {
    "nodes": [
      {
        "id": 0,
        "label": "JE",
        "x": 2,
        "y": 11
      },
      {
        "id": 1,
        "label": "CCK",
        "x": 2,
        "y": 5
      },
      {
        "id": 2,
        "label": "Kranji",
        "x": 2,
        "y": 2
      },
      {
        "id": 3,
        "label": "Woodlands",
        "x": 5,
        "y": 0
      },
      {
        "id": 4,
        "label": "Yishun",
        "x": 8,
        "y": 1
      },
      {
        "id": 5,
        "label": "Bishan",
        "x": 8,
        "y": 5
      },
      {
        "id": 6,
        "label": "Newton",
        "x": 8,
        "y": 8
      },
      {
        "id": 7,
        "label": "Dhoby",
        "x": 9,
        "y": 10
      },
      {
        "id": 8,
        "label": "RP",
        "x": 10,
        "y": 12
      },
      {
        "id": 9,
        "label": "Bay",
        "x": 11,
        "y": 15
      },
      {
        "id": 10,
        "label": "Pasir Ris",
        "x": 19,
        "y": 5
      },
      {
        "id": 11,
        "label": "Tampines",
        "x": 18,
        "y": 7
      },
      {
        "id": 12,
        "label": "Tanah Merah",
        "x": 17,
        "y": 9
      },
      {
        "id": 13,
        "label": "Expo",
        "x": 19,
        "y": 10
      },
      {
        "id": 14,
        "label": "Paya Lebar",
        "x": 14,
        "y": 10
      },
      {
        "id": 15,
        "label": "Bugis",
        "x": 12,
        "y": 11
      },
      {
        "id": 16,
        "label": "Outram",
        "x": 7,
        "y": 14
      },
      {
        "id": 17,
        "label": "Buona",
        "x": 4,
        "y": 11
      },
      {
        "id": 18,
        "label": "Boon Lay",
        "x": 0,
        "y": 11
      },
      {
        "id": 19,
        "label": "Tuas",
        "x": 0,
        "y": 8
      },
      {
        "id": 20,
        "label": "Harbourfront",
        "x": 5,
        "y": 15
      },
      {
        "id": 21,
        "label": "Chinatown",
        "x": 7,
        "y": 12
      },
      {
        "id": 22,
        "label": "Little India",
        "x": 10,
        "y": 9
      },
      {
        "id": 23,
        "label": "Serangoon",
        "x": 12,
        "y": 5
      },
      {
        "id": 24,
        "label": "Sengkang",
        "x": 14,
        "y": 2
      },
      {
        "id": 25,
        "label": "Punggol",
        "x": 15,
        "y": 0
      },
      {
        "id": 26,
        "label": "Botanics",
        "x": 5,
        "y": 8
      },
      {
        "id": 27,
        "label": "Caldecott",
        "x": 6,
        "y": 6
      },
      {
        "id": 28,
        "label": "MacPherson",
        "x": 14,
        "y": 7
      },
      {
        "id": 29,
        "label": "Promenade",
        "x": 13,
        "y": 13
      },
      {
        "id": 30,
        "label": "BP",
        "x": 4,
        "y": 5
      },
      {
        "id": 31,
        "label": "Downtown",
        "x": 9,
        "y": 14
      },
      {
        "id": 32,
        "label": "Jln Besar",
        "x": 12,
        "y": 9
      }
    ],
    "edges": [
      {
        "start": 0,
        "end": 1,
        "weight": 15
      },
      {
        "start": 1,
        "end": 2,
        "weight": 8
      },
      {
        "start": 2,
        "end": 3,
        "weight": 5
      },
      {
        "start": 3,
        "end": 4,
        "weight": 15
      },
      {
        "start": 4,
        "end": 5,
        "weight": 16
      },
      {
        "start": 5,
        "end": 6,
        "weight": 12
      },
      {
        "start": 6,
        "end": 7,
        "weight": 10
      },
      {
        "start": 7,
        "end": 8,
        "weight": 5
      },
      {
        "start": 8,
        "end": 9,
        "weight": 2
      },
      {
        "start": 10,
        "end": 11,
        "weight": 3
      },
      {
        "start": 11,
        "end": 12,
        "weight": 5
      },
      {
        "start": 12,
        "end": 13,
        "weight": 3
      },
      {
        "start": 12,
        "end": 14,
        "weight": 15
      },
      {
        "start": 15,
        "end": 8,
        "weight": 6
      },
      {
        "start": 8,
        "end": 16,
        "weight": 5
      },
      {
        "start": 16,
        "end": 17,
        "weight": 16
      },
      {
        "start": 15,
        "end": 14,
        "weight": 12
      },
      {
        "start": 17,
        "end": 0,
        "weight": 15
      },
      {
        "start": 0,
        "end": 18,
        "weight": 13
      },
      {
        "start": 18,
        "end": 19,
        "weight": 17
      },
      {
        "start": 20,
        "end": 16,
        "weight": 3
      },
      {
        "start": 16,
        "end": 21,
        "weight": 2
      },
      {
        "start": 7,
        "end": 22,
        "weight": 2
      },
      {
        "start": 21,
        "end": 7,
        "weight": 5
      },
      {
        "start": 22,
        "end": 23,
        "weight": 18
      },
      {
        "start": 23,
        "end": 24,
        "weight": 15
      },
      {
        "start": 24,
        "end": 25,
        "weight": 3
      },
      {
        "start": 20,
        "end": 17,
        "weight": 20
      },
      {
        "start": 17,
        "end": 26,
        "weight": 10
      },
      {
        "start": 26,
        "end": 27,
        "weight": 5
      },
      {
        "start": 5,
        "end": 27,
        "weight": 5
      },
      {
        "start": 5,
        "end": 23,
        "weight": 5
      },
      {
        "start": 23,
        "end": 28,
        "weight": 7
      },
      {
        "start": 28,
        "end": 14,
        "weight": 2
      },
      {
        "start": 14,
        "end": 29,
        "weight": 12
      },
      {
        "start": 9,
        "end": 29,
        "weight": 6
      },
      {
        "start": 1,
        "end": 30,
        "weight": 15
      },
      {
        "start": 30,
        "end": 26,
        "weight": 25
      },
      {
        "start": 26,
        "end": 6,
        "weight": 8
      },
      {
        "start": 6,
        "end": 22,
        "weight": 3
      },
      {
        "start": 22,
        "end": 15,
        "weight": 3
      },
      {
        "start": 15,
        "end": 29,
        "weight": 2
      },
      {
        "start": 29,
        "end": 31,
        "weight": 6
      },
      {
        "start": 31,
        "end": 21,
        "weight": 5
      },
      {
        "start": 21,
        "end": 32,
        "weight": 8
      },
      {
        "start": 32,
        "end": 28,
        "weight": 12
      },
      {
        "start": 28,
        "end": 11,
        "weight": 16
      },
      {
        "start": 11,
        "end": 13,
        "weight": 12
      }
    ]
  },
  {
    "nodes": [
      {
        "id": 0,
        "label": "0",
        "x": 9,
        "y": 0
      },
      {
        "id": 1,
        "label": "1",
        "x": 7,
        "y": 6
      },
      {
        "id": 2,
        "label": "2",
        "x": 10,
        "y": 4
      },
      {
        "id": 3,
        "label": "3",
        "x": 4,
        "y": 7
      },
      {
        "id": 4,
        "label": "4",
        "x": 14,
        "y": 7
      },
      {
        "id": 5,
        "label": "5",
        "x": 7,
        "y": 11
      },
      {
        "id": 6,
        "label": "6",
        "x": 10,
        "y": 11
      },
      {
        "id": 7,
        "label": "7",
        "x": 9,
        "y": 15
      }
    ],
    "edges": [
      {
        "start": 0,
        "end": 1,
        "weight": 7
      },
      {
        "start": 1,
        "end": 3,
        "weight": 9
      },
      {
        "start": 1,
        "end": 5,
        "weight": 1
      },
      {
        "start": 3,
        "end": 5,
        "weight": 4
      },
      {
        "start": 5,
        "end": 7,
        "weight": 9
      },
      {
        "start": 6,
        "end": 7,
        "weight": 2
      },
      {
        "start": 6,
        "end": 4,
        "weight": 8
      },
      {
        "start": 2,
        "end": 6,
        "weight": 5
      },
      {
        "start": 4,
        "end": 2,
        "weight": 2
      },
      {
        "start": 2,
        "end": 0,
        "weight": 6
      },
      {
        "start": 0,
        "end": 3,
        "weight": 3
      },
      {
        "start": 4,
        "end": 7,
        "weight": 7
      }
    ]
  },
  {
    "nodes": [
      {
        "id": 0,
        "label": "A",
        "x": 2,
        "y": 3
      },
      {
        "id": 1,
        "label": "B",
        "x": 6,
        "y": 7
      },
      {
        "id": 2,
        "label": "C",
        "x": 3,
        "y": 12
      },
      {
        "id": 3,
        "label": "D",
        "x": 10,
        "y": 2
      },
      {
        "id": 4,
        "label": "E",
        "x": 10,
        "y": 10
      },
      {
        "id": 5,
        "label": "F",
        "x": 15,
        "y": 5
      },
      {
        "id": 6,
        "label": "G",
        "x": 14,
        "y": 9
      }
    ],
    "edges": [
      {
        "start": 0,
        "end": 1,
        "weight": 2
      },
      {
        "start": 2,
        "end": 1,
        "weight": 3
      },
      {
        "start": 1,
        "end": 4,
        "weight": 2
      },
      {
        "start": 1,
        "end": 5,
        "weight": 1
      },
      {
        "start": 0,
        "end": 3,
        "weight": 3
      },
      {
        "start": 3,
        "end": 6,
        "weight": 1
      },
      {
        "start": 3,
        "end": 5,
        "weight": 4
      },
      {
        "start": 4,
        "end": 5,
        "weight": 3
      },
      {
        "start": 6,
        "end": 5,
        "weight": 7
      }
    ]
  },
  {
    "nodes": [
      {
        "id": 0,
        "label": "Tokyo",
        "x": 12,
        "y": 9
      },
      {
        "id": 1,
        "label": "Shinagawa",
        "x": 11,
        "y": 12
      },
      {
        "id": 2,
        "label": "Osaki",
        "x": 9,
        "y": 12
      },
      {
        "id": 3,
        "label": "Shinjuku",
        "x": 6,
        "y": 7
      },
      {
        "id": 4,
        "label": "Ikebukuro",
        "x": 7,
        "y": 4
      },
      {
        "id": 5,
        "label": "Nippori",
        "x": 11,
        "y": 3
      },
      {
        "id": 6,
        "label": "Ueno",
        "x": 12,
        "y": 5
      },
      {
        "id": 7,
        "label": "Akihabara",
        "x": 12,
        "y": 7
      },
      {
        "id": 8,
        "label": "Ochanomizu",
        "x": 10,
        "y": 7
      },
      {
        "id": 9,
        "label": "Yotsuya",
        "x": 8,
        "y": 8
      },
      {
        "id": 10,
        "label": "Kawasaki",
        "x": 9,
        "y": 15
      },
      {
        "id": 11,
        "label": "Musashi-Kosugi",
        "x": 7,
        "y": 14
      },
      {
        "id": 12,
        "label": "Yokohama",
        "x": 4,
        "y": 15
      },
      {
        "id": 13,
        "label": "Ofuna",
        "x": 1,
        "y": 15
      },
      {
        "id": 14,
        "label": "Nishi-Funabashi",
        "x": 15,
        "y": 7
      },
      {
        "id": 15,
        "label": "Chiba",
        "x": 16,
        "y": 10
      },
      {
        "id": 16,
        "label": "Shim-Matsudo",
        "x": 15,
        "y": 2
      },
      {
        "id": 17,
        "label": "Abiko",
        "x": 17,
        "y": 1
      },
      {
        "id": 18,
        "label": "Narita",
        "x": 19,
        "y": 7
      },
      {
        "id": 19,
        "label": "Sakura",
        "x": 18,
        "y": 9
      },
      {
        "id": 20,
        "label": "Akabane",
        "x": 8,
        "y": 2
      },
      {
        "id": 21,
        "label": "Musashi-Urawa",
        "x": 6,
        "y": 1
      },
      {
        "id": 22,
        "label": "Omiya",
        "x": 4,
        "y": 0
      },
      {
        "id": 23,
        "label": "Takasaki",
        "x": 0,
        "y": 0
      },
      {
        "id": 24,
        "label": "Kawagoe",
        "x": 2,
        "y": 1
      },
      {
        "id": 25,
        "label": "Nishi-Kokubunji",
        "x": 3,
        "y": 6
      },
      {
        "id": 26,
        "label": "Tachikawa",
        "x": 2,
        "y": 7
      },
      {
        "id": 27,
        "label": "Hachioji",
        "x": 0,
        "y": 8
      },
      {
        "id": 28,
        "label": "Haijima",
        "x": 0,
        "y": 6
      },
      {
        "id": 29,
        "label": "Komagawa",
        "x": 1,
        "y": 3
      },
      {
        "id": 30,
        "label": "Hashimoto",
        "x": 0,
        "y": 10
      },
      {
        "id": 31,
        "label": "Fuchuhommachi",
        "x": 3,
        "y": 9
      },
      {
        "id": 32,
        "label": "Soga",
        "x": 16,
        "y": 12
      },
      {
        "id": 33,
        "label": "Kisarazu",
        "x": 15,
        "y": 15
      },
      {
        "id": 34,
        "label": "Oami",
        "x": 18,
        "y": 14
      },
      {
        "id": 35,
        "label": "Naruto",
        "x": 19,
        "y": 12
      },
      {
        "id": 36,
        "label": "Oyama",
        "x": 8,
        "y": 0
      },
      {
        "id": 37,
        "label": "Utsunomiya",
        "x": 11,
        "y": 0
      }
    ],
    "edges": [
      {
        "start": 0,
        "end": 1,
        "weight": 10
      },
      {
        "start": 2,
        "end": 1,
        "weight": 3
      },
      {
        "start": 2,
        "end": 3,
        "weight": 12
      },
      {
        "start": 3,
        "end": 4,
        "weight": 7
      },
      {
        "start": 4,
        "end": 5,
        "weight": 13
      },
      {
        "start": 5,
        "end": 6,
        "weight": 4
      },
      {
        "start": 6,
        "end": 7,
        "weight": 3
      },
      {
        "start": 7,
        "end": 0,
        "weight": 4
      },
      {
        "start": 7,
        "end": 8,
        "weight": 2
      },
      {
        "start": 0,
        "end": 8,
        "weight": 4
      },
      {
        "start": 9,
        "end": 8,
        "weight": 5
      },
      {
        "start": 9,
        "end": 3,
        "weight": 4
      },
      {
        "start": 1,
        "end": 10,
        "weight": 8
      },
      {
        "start": 1,
        "end": 11,
        "weight": 10
      },
      {
        "start": 2,
        "end": 11,
        "weight": 10
      },
      {
        "start": 11,
        "end": 12,
        "weight": 12
      },
      {
        "start": 10,
        "end": 12,
        "weight": 8
      },
      {
        "start": 13,
        "end": 12,
        "weight": 15
      },
      {
        "start": 7,
        "end": 14,
        "weight": 27
      },
      {
        "start": 0,
        "end": 14,
        "weight": 30
      },
      {
        "start": 14,
        "end": 15,
        "weight": 24
      },
      {
        "start": 15,
        "end": 19,
        "weight": 18
      },
      {
        "start": 19,
        "end": 18,
        "weight": 13
      },
      {
        "start": 18,
        "end": 17,
        "weight": 41
      },
      {
        "start": 17,
        "end": 16,
        "weight": 13
      },
      {
        "start": 16,
        "end": 5,
        "weight": 27
      },
      {
        "start": 5,
        "end": 20,
        "weight": 17
      },
      {
        "start": 4,
        "end": 20,
        "weight": 10
      },
      {
        "start": 20,
        "end": 21,
        "weight": 10
      },
      {
        "start": 21,
        "end": 22,
        "weight": 11
      },
      {
        "start": 21,
        "end": 16,
        "weight": 31
      },
      {
        "start": 22,
        "end": 23,
        "weight": 72
      },
      {
        "start": 22,
        "end": 24,
        "weight": 23
      },
      {
        "start": 3,
        "end": 25,
        "weight": 25
      },
      {
        "start": 26,
        "end": 25,
        "weight": 5
      },
      {
        "start": 21,
        "end": 25,
        "weight": 25
      },
      {
        "start": 27,
        "end": 26,
        "weight": 10
      },
      {
        "start": 26,
        "end": 28,
        "weight": 11
      },
      {
        "start": 27,
        "end": 28,
        "weight": 13
      },
      {
        "start": 29,
        "end": 28,
        "weight": 31
      },
      {
        "start": 29,
        "end": 24,
        "weight": 18
      },
      {
        "start": 23,
        "end": 29,
        "weight": 86
      },
      {
        "start": 27,
        "end": 30,
        "weight": 12
      },
      {
        "start": 30,
        "end": 13,
        "weight": 73
      },
      {
        "start": 30,
        "end": 12,
        "weight": 39
      },
      {
        "start": 26,
        "end": 31,
        "weight": 12
      },
      {
        "start": 25,
        "end": 31,
        "weight": 5
      },
      {
        "start": 31,
        "end": 11,
        "weight": 30
      },
      {
        "start": 16,
        "end": 14,
        "weight": 16
      },
      {
        "start": 0,
        "end": 32,
        "weight": 42
      },
      {
        "start": 15,
        "end": 32,
        "weight": 6
      },
      {
        "start": 32,
        "end": 33,
        "weight": 32
      },
      {
        "start": 32,
        "end": 34,
        "weight": 18
      },
      {
        "start": 34,
        "end": 35,
        "weight": 20
      },
      {
        "start": 19,
        "end": 35,
        "weight": 27
      },
      {
        "start": 22,
        "end": 36,
        "weight": 48
      },
      {
        "start": 36,
        "end": 37,
        "weight": 27
      }
    ]
  }
];