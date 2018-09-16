export default {
  start: { x: 1, y: 1 },
  tiles: [
    {
      id: 1,
      caption: "Start",
      description: "",
      position: {
        x: 1,
        y: 1
      },
      prev: [{ x: 2, y: 1 }],
      next: [{ x: 1, y: 2 }]
    },
    {
      id: 2,
      caption: "\"Erudito\" bookstore",
      description: "Price - $12000, income = $4000",
      position: { x: 1, y: 2 },
      prev: [{ x: 1, y: 1 }],
      next: [{ x: 1, y: 3 }],
      event: {
        type: "manual",
        manualAction: {
          type: "buySmallProperty",
          reference: "erudito",
          caption: "Buy \"Erudito\""
        }
      }
    },
    {
      id: 3,
      caption: "Police",
      description: "You got arrested for 2 turns",
      position: { x: 1, y: 3 },
      prev: [{ x: 1, y: 2 }],
      next: [{ x: 2, y: 3 }],
      event: {
        type: "freeze",
        value: 2,
        text: "Jailed"
      }
    },
    {
      id: 4,
      caption: "Lucky lottery",
      description: "",
      position: { x: 2, y: 3 },
      prev: [{ x: 1, y: 3 }],
      next: [{ x: 3, y: 3 }],
      event: {
        type: "getMoney",
        value: 2000,
        text: ". He was lucky at lottery"
      }
    },
    {
      id: 5,
      caption: "Mad Antonio saloon",
      description: "Popular backstreet bar",
      position: { x: 3, y: 3 },
      prev: [{ x: 2, y: 3 }],
      next: [{ x: 4, y: 3 }],
      event: {
        type: "manual",
        manualAction: {
          type: "buySmallProperty",
          reference: "madAntonio",
          caption: "Buy \"Mad Antonio\""
        }
      }
    },
    {
      id: 6,
      caption: "Trauma",
      description: "Ouch! You have broke your leg",
      position: { x: 4, y: 3 },
      prev: [{ x: 3, y: 3 }],
      next: [{ x: 4, y: 2 }],
      event: {
        type: "freeze",
        value: 2,
        text: "Broke leg"
      }
    },
    {
      id: 7,
      caption: "St. Michel pharmacy",
      description: "",
      position: { x: 4, y: 2 },
      prev: [{ x: 4, y: 3 }],
      next: [{ x: 4, y: 1 }],
      event: {
        type: "manual",
        manualAction: {
          type: "buySmallProperty",
          reference: "StMichelPharmacy",
          caption: "Buy \"St. Michel pharmacy\""
        }
      }
    },
    {
      id: 8,
      caption: "",
      description: "",
      position: { x: 4, y: 1 },
      prev: [{ x: 4, y: 2 }],
      next: [{ x: 3, y: 1 }]
    },
    {
      id: 9,
      caption: "It's a robbery!",
      description: "",
      position: { x: 3, y: 1 },
      prev: [{ x: 4, y: 1 }],
      next: [{ x: 2, y: 1 }],
      event: {
        type: "lostMoney",
        value: 1000,
        text: ". It was a robbery!"
      }
    },
    {
      id: 10,
      caption: "",
      description: "",
      position: { x: 2, y: 1 },
      prev: [{ x: 3, y: 1 }],
      next: [{ x: 1, y: 1 }]
    }
  ]
};