Log Merge Application
This application merges log entries from multiple sources in chronological order. The logs can be processed both synchronously and asynchronously, and the solution is optimized for performance using a min-heap data structure.

Overview
The Log Merge Application is designed to handle multiple log sources and print all log entries in chronological order. The application supports both synchronous and asynchronous processing of log entries. Initially, a brute-force method was used, which was then optimized using an external heap library to enhance speed and performance.

Initial Brute-Force Approach
The initial implementation used a brute-force method to merge log entries. This approach involved loading all log entries into memory and sorting them, which was not efficient for large datasets.

Optimized Approach
To improve performance, the brute-force method was replaced with a solution leveraging a min-heap (priority queue) from the heap library. This optimized approach ensures efficient merging and printing of log entries in chronological order without loading all entries into memory at once.

Key Improvements
Heap Data Structure: The min-heap allows efficient retrieval of the smallest log entry, ensuring optimal performance.
Batch Processing: Log entries are processed in batches, reducing the overhead of frequent heap operations.
Asynchronous Handling: The asynchronous version handles log entries in a non-blocking manner, making it suitable for scenarios with asynchronously available log sources.
