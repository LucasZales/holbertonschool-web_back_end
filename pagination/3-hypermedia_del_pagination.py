#!/usr/bin/env python3
"""Deletion-resilient hypermedia pagination."""

import csv
from typing import Dict, List


class Server:
    """Server class for pagination."""

    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Return the dataset."""
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Return the dataset indexed by position."""
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }

        return self.__indexed_dataset

    def get_hyper_index(
        self, index: int = None, page_size: int = 10
    ) -> Dict:
        """Return a deletion-resilient page."""
        assert isinstance(index, int) and index >= 0
        assert index < len(self.indexed_dataset())
        assert isinstance(page_size, int) and page_size > 0

        data = []
        current_index = index

        while len(data) < page_size:
            if current_index in self.indexed_dataset():
                data.append(self.indexed_dataset()[current_index])
            current_index += 1

            if current_index >= len(self.dataset()):
                break

        return {
            "index": index,
            "data": data,
            "page_size": len(data),
            "next_index": current_index
        }
