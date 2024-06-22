"use strict";

const Heap = require("heap");

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  const entryHeap = new Heap((log1, log2) => log1.date - log2.date);

  logSources.forEach((logSource, index) => {
    const logEntry = logSource.pop();
    if (logEntry) {
      entryHeap.push({ ...logEntry, sourceIndex: index });
    }
  });

  while (!entryHeap.empty()) {
    const oldestLogEntry = entryHeap.pop();
    printer.print(oldestLogEntry);

    const sourceIndex = oldestLogEntry.sourceIndex;
    const newLogEntry = logSources[sourceIndex].pop();
    if (newLogEntry) {
      entryHeap.push({ ...newLogEntry, sourceIndex });
    }
  }

  printer.done();
};
