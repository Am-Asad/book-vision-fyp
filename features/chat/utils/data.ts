export const users = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "Alice Johnson",
    email: "alice@example.com",
    password: "hashedpassword123",
  },
  {
    id: "1a79a4d6-7fbc-41d3-b65d-4c61e6c7d3aa",
    name: "Bob Smith",
    email: "bob@example.com",
    password: "hashedpassword456",
  },
];

export const chats = [
  {
    id: "de305d54-75b4-431b-adb2-eb6b9e546013",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    title: "Recursion",
    messages: [
      {
        id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        chatId: "de305d54-75b4-431b-adb2-eb6b9e546013",
        senderId: "550e8400-e29b-41d4-a716-446655440000",
        role: "user",
        content: "What is recursion?",
        timestamp: new Date().toISOString(),
        type: "text",
      },
      {
        id: "6ba7b814-9dad-11d1-80b4-00c04fd430c8",
        chatId: "de305d54-75b4-431b-adb2-eb6b9e546013",
        senderId: "system",
        role: "system",
        content: "Recursion is when a function calls itself...",
        timestamp: new Date().toISOString(),
        type: "text",
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "c56a4180-65aa-42ec-a945-5fd21dec0538",
    userId: "1a79a4d6-7fbc-41d3-b65d-4c61e6c7d3aa",
    title: "Binary Search",
    messages: [
      {
        id: "9b2dbd16-8122-4b9d-bcb4-8f62f3b5b9e9",
        chatId: "c56a4180-65aa-42ec-a945-5fd21dec0538",
        senderId: "1a79a4d6-7fbc-41d3-b65d-4c61e6c7d3aa",
        role: "user",
        content: "Can you explain binary search?",
        timestamp: new Date().toISOString(),
        type: "text",
      },
      {
        id: "e2e8a22d-24c8-4e2b-9a73-d8b8d6b9ef30",
        chatId: "c56a4180-65aa-42ec-a945-5fd21dec0538",
        senderId: "system",
        role: "system",
        content:
          "Sure! Binary search works by dividing the search space in half...",
        timestamp: new Date().toISOString(),
        type: "text",
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "a1234567-89ab-cdef-0123-456789abcdef",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    title: "Sorting Algorithms",
    messages: [
      {
        id: "b2345678-90ab-cdef-1234-56789abcdef0",
        chatId: "a1234567-89ab-cdef-0123-456789abcdef",
        senderId: "550e8400-e29b-41d4-a716-446655440000",
        role: "user",
        content: "How does quicksort work?",
        timestamp: "2025-03-06T12:00:00.000Z",
        type: "text",
      },
      {
        id: "c2345678-90ab-cdef-2345-6789abcdef1",
        chatId: "a1234567-89ab-cdef-0123-456789abcdef",
        senderId: "system",
        role: "system",
        content:
          "Quicksort is a divide-and-conquer algorithm that sorts by partitioning...",
        timestamp: "2025-03-06T12:01:00.000Z",
        type: "text",
      },
    ],
    createdAt: "2025-03-06T12:00:00.000Z",
    updatedAt: "2025-03-06T12:01:00.000Z",
  },
  {
    id: "b4567890-12ab-cdef-2345-6789abcdef01",
    userId: "1a79a4d6-7fbc-41d3-b65d-4c61e6c7d3aa",
    title: "Graphs and Trees",
    messages: [
      {
        id: "c5678901-23ab-cdef-3456-789abcdef012",
        chatId: "b4567890-12ab-cdef-2345-6789abcdef01",
        senderId: "1a79a4d6-7fbc-41d3-b65d-4c61e6c7d3aa",
        role: "user",
        content: "What are the different types of graphs?",
        timestamp: "2025-02-28T15:30:00.000Z",
        type: "text",
      },
      {
        id: "d5678901-23ab-cdef-4567-89abcdef013",
        chatId: "b4567890-12ab-cdef-2345-6789abcdef01",
        senderId: "system",
        role: "system",
        content:
          "Graphs can be directed, undirected, weighted, unweighted, etc.",
        timestamp: "2025-02-28T15:31:00.000Z",
        type: "text",
      },
    ],
    createdAt: "2025-02-28T15:30:00.000Z",
    updatedAt: "2025-02-28T15:31:00.000Z",
  },
  {
    id: "c6789012-34ab-cdef-4567-89abcdef0123",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    title: "Linked Lists",
    messages: [
      {
        id: "d7890123-45ab-cdef-5678-9abcdef01234",
        chatId: "c6789012-34ab-cdef-4567-89abcdef0123",
        senderId: "550e8400-e29b-41d4-a716-446655440000",
        role: "user",
        content: "Explain doubly linked lists.",
        timestamp: "2025-02-20T09:00:00.000Z",
        type: "text",
      },
      {
        id: "e7890123-45ab-cdef-6789-abcdef012345",
        chatId: "c6789012-34ab-cdef-4567-89abcdef0123",
        senderId: "system",
        role: "system",
        content:
          "A doubly linked list has pointers to both previous and next nodes.",
        timestamp: "2025-02-20T09:01:00.000Z",
        type: "text",
      },
    ],
    createdAt: "2025-02-20T09:00:00.000Z",
    updatedAt: "2025-02-20T09:01:00.000Z",
  },
];
