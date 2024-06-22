"use strict";

const Heap = require("heap");

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = async (logSources, printer) => {
  const entryHeap = new Heap((log1, log2) => log1.date - log2.date);

  await Promise.all(
    logSources.map(async (logSource, index) => {
      const logEntry = await logSource.popAsync();
      if (logEntry) {
        entryHeap.push({ ...logEntry, sourceIndex: index });
      }
    })
  );

  let activeLogSources = logSources.filter((logSource) => !logSource.drained);

  while (!entryHeap.empty()) {
    await Promise.all(
      activeLogSources.map(async (logSource, index) => {
        const logEntry = await logSource.popAsync();
        if (
          logEntry &&
          (entryHeap.empty() || logEntry.date >= entryHeap.peek().date)
        ) {
          entryHeap.push({ ...logEntry, sourceIndex: index });
        }
      })
    );

    activeLogSources = logSources.filter((logSource) => !logSource.drained);

    const batchSize =
      Math.floor(entryHeap.size() / activeLogSources.length) ||
      entryHeap.size();

    for (let i = 0; i < batchSize; i++) {
      printer.print(entryHeap.pop());
    }

    if (activeLogSources.length === 0) {
      while (!entryHeap.empty()) {
        printer.print(entryHeap.pop());
      }
    }
  }

  printer.done();
};
