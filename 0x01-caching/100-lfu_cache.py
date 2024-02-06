#!/usr/bin/env python3
""" LFU caching method
"""
from collections import OrderedDict

BaseCaching = __import__("base_caching").BaseCaching


class LFUCache(BaseCaching):
    """LFUCache class that inherits for BaseCache"""

    def __init__(self):
        """initialize class"""
        super().__init__()
        self.cache_data = OrderedDict()
        self.track_items = {}

    def put(self, key, item):
        """Add an item in the cache
        Args:
            key: item key
            item: item value
        """
        if key is None or item is None:
            return

        if self.cache_data.get(key):
            self.cache_data[key] = item
            self.track_items[key] += 1
            self.cache_data.move_to_end(key)
            return

        # remove the Least frequently used item in cache
        # if the length is greater that self.MAX_ITEMS
        if len(self.cache_data) >= self.MAX_ITEMS:
            min_val = min(self.track_items.values())
            min_keys = [k for k, v in self.track_items.items() if v == min_val]
            if len(min_keys) > 1:
                for key_ in self.cache_data.keys():
                    if key_ in min_keys:
                        discard_key = key_
                        del self.cache_data[discard_key]
                        del self.track_items[discard_key]
                        break
            else:
                discard_key = min_keys[0]
                del self.cache_data[discard_key]
                del self.track_items[discard_key]

            print(f"DISCARD: {discard_key}")

        self.cache_data[key] = item
        self.track_items[key] = 1
        self.cache_data.move_to_end(key)

    def get(self, key):
        """Get an item by key
        Args:
            key: item key
        """
        if key is None or self.cache_data.get(key) is None:
            return None

        # update used value
        self.track_items[key] += 1
        self.cache_data.move_to_end(key)
        return self.cache_data.get(key)
