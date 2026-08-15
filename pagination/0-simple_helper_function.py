#!/usr/bin/env python3
"""Helper function for pagination."""


def index_range(page: int, page_size: int) -> tuple:
    """Return the start and end indexes."""
    start = (page - 1) * page_size
    end = page * page_size
    return (start, end)
