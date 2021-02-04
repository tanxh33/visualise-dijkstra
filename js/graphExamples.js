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
        // focus: true
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
        // focus: true
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
  }
];