#!/usr/bin/env python3
"""Wait n module."""

import asyncio
from typing import List

wait_random = __import__("0-basic_async_syntax").wait_random


async def wait_n(n: int, max_delay: int) -> List[float]:
    """Return all delays."""
    results = []

    coroutines = [
        asyncio.create_task(wait_random(max_delay))
        for _ in range(n)
    ]

    for finished in asyncio.as_completed(coroutines):
        results.append(await finished)

    return results
