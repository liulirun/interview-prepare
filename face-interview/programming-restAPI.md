| Feature            | POST                                                 | PUT                                                  |
| ------------------ | ---------------------------------------------------- | ---------------------------------------------------- |
| **Primary Action** | **Create** a new resource.                           | **Update/Replace** an existing resource.             |
| **Idempotency**    | **No**. Multiple requests create multiple resources. | **Yes**. Multiple requests result in the same state. |
| **URI Control**    | **Server** determines the URI.                       | **Client** specifies the exact URI.                  |
| **Payload**        | Data for a new subordinate resource.                 | Entire representation to replace the resource.       |
| **Success Code**   | Typically `201 Created`.                             | Typically `200 OK` or `204 No Content`.              |
| **Usage Example**  | `POST /users` (Server assigns ID)                    | `PUT /users/123` (Updates specific ID)               |

**Key Decision Rules**

- **Identification**: Use **POST** when the server should generate the resource ID. Use **PUT** when the client already knows the specific URI.
- **Replacement vs. Addition**: Use **PUT** to completely replace an existing resource. Use **POST** to append a new resource to a collection.
- **Repetition**: Use **PUT** if you need the operation to be safe to run multiple times (idempotent). If repeating the action should create duplicates, use **POST**.
- **Partial Updates**: If you only need to update specific fields rather than replacing the whole object, use **PATCH** instead of PUT.