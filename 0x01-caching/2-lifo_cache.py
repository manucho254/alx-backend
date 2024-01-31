#!/usr/bin/env python3
""" LIFOCache caching method
"""

BaseCaching = __import__("base_caching").BaseCaching


class LIFOCache(BaseCaching):
    """LIFOCache class that inherits for BaseCache"""

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

        # track items by order on insert
        if len(cache) == 0:
            self.track_items[1] = key
        else:
            self.track_items[max(self.track_items.keys()) + 1] = key

        cache.update({key: item})

        # remove the last inserted item in cache before
        # the current added value
        # if the length is greater that self.MAX_ITEMS
        if len(cache) > self.MAX_ITEMS:
            max_val = max(self.track_items.keys()) - 1
            discard_key = self.track_items[max_val]

            print(f"DISCARD: {discard_key}")
            del cache[discard_key]
            del self.track_items[max_val]

        self.__dict__.update(data)

    def get(self, key):
        """Get an item by key
        Args:
            key: item key
        """
        data = self.__dict__

        if key is None or not data["cache_data"].get(key):
            return None

        return data["cache_data"].get(key)
