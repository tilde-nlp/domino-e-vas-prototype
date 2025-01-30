# What is Virtual Assistant Service
In the frame of DOMINO-E project, the Virtual Assistant is a function of the UAS graphical interface allowing the End User to express his needs with Natural Language. The Virtual Assistant is in charge of interpreting the request of the End User and proposing an answer or an action or asking for complementary information based on the services available in the UAS. The Virtual Assistant guidance through a conversation with the End User is a real asset.

# Selecting a Geographical Item
This function allows the End User to define its geographical area of interest and it results in one or several targets (point) or one or several areas. The selection can be based on a place finder component (toponym search).

# Search Existing Products in Catalogue
The End User uses the UAS to search existing products in the system. The search can be a complex request based on several criteria association such as the cloud coverage, acquisition angles, type of products, periods of time or results of enhanced processing.
Since the Archive/Catalogue Service falls outside the scope of the DOMINO-E project, there are no plans to develop its simulator or integrate it into the testbed deployment. ACS functions as a catalogue service, delivering catalogue data through an API compatible with the SpatioTemporal Asset Catalog (STAC) standard. STAC defines a unified framework for describing and cataloging spatiotemporal assets. To validate Virtual Assistant Service use cases reliant on ACS, VAS will utilize external services compatible with the STAC API, as listed in the STAC catalogue available at STAC Datasets (https://stacspec.org/en/about/datasets/).

# Build a User Request
The End User can build a User Request of type “Product Request” that is composed of an association of Programming Requests, Production Requests or Delivery Requests depending of its needs. He can also build a User Request of type “Event Follow Up Request” that can be triggered by a Product Request source and then can raise a new Product Request when the conditi?ons are met.

# How to Specify a Region on the Map?
To specify a region on the map, start by adjusting the zoom level to ensure the entire area you want to select is visible on the screen. Then, choose the Polygon Tool from the toolbar. Using your mouse, click on the map to define the corner points of the polygon. To complete the shape, double-click to add the final point and finish outlining the region.
