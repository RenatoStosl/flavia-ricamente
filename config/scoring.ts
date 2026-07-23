const positiveWeight1 = { always: 4, mostly: 3, sometimes: 2, "rarely-never": 1 };
const positiveWeight2 = { always: 8, mostly: 6, sometimes: 4, "rarely-never": 2 };
const negativeWeight1 = { always: -4, mostly: -3, sometimes: -2, "rarely-never": -1 };
const negativeWeight2 = { always: -8, mostly: -6, sometimes: -4, "rarely-never": -2 };

export const scoring = {
  answerScores: {
    "statement-1": positiveWeight2,
    "statement-2": positiveWeight1,
    "statement-3": negativeWeight1,
    "statement-4": negativeWeight1,
    "statement-5": negativeWeight2,
    "statement-6": positiveWeight2,
    "statement-7": negativeWeight1,
    "statement-8": positiveWeight1,
    "statement-9": positiveWeight2,
    "statement-10": positiveWeight2,
    "statement-11": negativeWeight2,
    "statement-12": negativeWeight1,
    "statement-13": positiveWeight2,
    "statement-14": positiveWeight2,
    "statement-15": negativeWeight2,
    "statement-18": negativeWeight1,
    "statement-19": positiveWeight1,
    "statement-20": positiveWeight2,
    "statement-21": positiveWeight2,
    "statement-22": negativeWeight2,
    "statement-23": positiveWeight1,
    "statement-24": negativeWeight1,
    "statement-25": positiveWeight1,
    "statement-27": negativeWeight2,
  },
} as const;
