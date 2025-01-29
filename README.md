# DOMINO-E Virtual Assistant Service Prototype

We have implemented all VAS scenarios as outlined in the VAS Use Case, focusing on selecting geographical locations, searching for images in existing product catalogs, assisting users in placing new programming requests, and tracking the status of those requests.

The VAS Prototype Chatbot is be implemented using a typical approach used to implement a goal-oriented VA that works according to defined scenario and uses machine learning methods for the Natural Language Understanding. Additionally, the VA employs new generative AI based question-answering techniques to find answers to open questions within a domain-specific knowledge base.

The Virtual Assistant works according to its conversation Scenario. The scenario describes the main logic of the VA, it describes the conversation flow. When the User inputs a text, the text is sent to the Natural Language Understanding (NLU) models, and these models detect Intents and Named Entities in the text. Intents and Entities are used to guide the conversation through the dialog scenario. The VA also uses the Knowledge that is prepared for them. There can be various sources of knowledge - Questions & Answers, Data Tables, VA Outputs and information that is stored in External Information Systems. 

The VA generates Natural Language Outputs using pre-defined answers and VA output templates that are part of VA knowledge. With the recent advancements in generative AI, VAs can now leverage unstructured text documents as a Knowledge Base to answer open-ended questions that were not anticipated or explicitly programmed into the VA. 

The scenario for the VAS prototype chatbot has been designed and implemented using the VA platform, which features a graphical user interface. This interface allows for the creation of conversation flow graphs, management of training data and the knowledge base, and integration with external systems.

The implemented VA Scenario has been exported in textual format and stored in this source code repositories, enabling change tracking. Additionally, the exported VA Scenario can be imported into a VA platform deployed in a different environment, facilitating the migration of VA Scenarios across environments.

