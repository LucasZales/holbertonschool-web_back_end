#!/usr/bin/env python3
"""Measure runtime."""

import time
import asyncio
wait_n = __import__("1-concurrent_coroutines").wait_n


def measure_time(n: int, max_delay: int) -> float:
    """Return average runtime."""
    # Start timer
    start = time.time()

    # Run coroutines
    asyncio.run(wait_n(n, max_delay))

    # End timer
    end = time.time()

    # Return average time
    return (end - start) / n
