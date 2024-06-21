"use strict";

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  let entries = [];
  let completedSources = 0;

  logSources.forEach((source, index) => {
    const entry = source.pop();
    if (entry) {
      entries[index] = entry;
    } else {
      completedSources++;
    }
  });

  while (completedSources < logSources.length) {
    let smallestIndex = -1;
    let smallestEntry = null;
    for (let i = 0; i < entries.length; i++) {
      if (
        entries[i] &&
        (smallestEntry === null || entries[i].date < smallestEntry.date)
      ) {
        smallestEntry = entries[i];
        smallestIndex = i;
      }
    }

    if (smallestIndex !== -1) {
      printer.print(smallestEntry);

      const nextEntry = logSources[smallestIndex].pop();
      if (nextEntry) {
        entries[smallestIndex] = nextEntry;
      } else {
        entries[smallestIndex] = null;
        completedSources++;
      }
    }
  }

  printer.done();
};
