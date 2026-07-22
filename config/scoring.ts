const positiveScale = { always: 4, mostly: 3, sometimes: 2, "rarely-never": 1 };
const reverseScale = { always: 1, mostly: 2, sometimes: 3, "rarely-never": 4 };

export const scoring = {
  answerScores: {
    "statement-1": positiveScale,
    "statement-2": positiveScale,
    "statement-3": reverseScale,
    "statement-4": reverseScale,
    "statement-5": reverseScale,
    "statement-6": positiveScale,
    "statement-7": reverseScale,
    "statement-8": positiveScale,
    "statement-9": positiveScale,
    "statement-10": positiveScale,
    "statement-11": reverseScale,
    "statement-12": reverseScale,
    "statement-13": reverseScale,
    "statement-14": positiveScale,
    "statement-15": reverseScale,
    "statement-16": positiveScale,
    "statement-17": positiveScale,
    "statement-18": reverseScale,
    "statement-19": positiveScale,
    "statement-20": positiveScale,
    "statement-21": positiveScale,
    "statement-22": reverseScale,
    "statement-23": positiveScale,
    "statement-24": reverseScale,
    "statement-25": positiveScale,
    "statement-26": reverseScale,
    "statement-27": reverseScale,
  },
} as const;
