#!/usr/bin/env python3
""" LRUCache caching method
"""
from datetime import datetime

BaseCaching = __import__("base_caching").BaseCaching


class LRUCache(BaseCaching):
    """LRUCache class that inherits for BaseCache"""

    def __init__(self):
        """initialize class"""
        super().__init__()
        self.track_items = {}

    def put(self, key, item):
        """Add an item in the cache
        Args:
            key: item key
            item: item value
        """
        if key is None or item is None:
            return

        data = self.__dict__
        cache = data["cache_data"]

        # track items by datetime on insert
        self.track_items[key] = datetime.now()

        cache.update({key: item})

        # remove the Least recently used item in cache
        # if the length is greater that self.MAX_ITEMS
        if len(cache) > self.MAX_ITEMS:
            min_val = min(self.track_items.values())
            discard_key = None

            for key_, val in self.track_items.items():
                if val == min_val:
                    discard_key = key_
                    del self.track_items[key_]
                    break

            print(f"DISCARD: {discard_key}")
            del cache[discard_key]

        self.__dict__.update(data)

    def get(self, key):
        """Get an item by key
        Args:
            key: item key
        """
        data = self.__dict__

        if key is None or not data["cache_data"].get(key):
            return None

        # update used value
        self.track_items[key] = datetime.now()

        return data["cache_data"].get(key)
