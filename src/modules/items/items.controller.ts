import { Request, Response } from 'express';
import { itemSchema } from './items.schema';
import { Item } from './items.model';

let items: Item[] = [
  { id: 1, name: 'Item One', description: 'This is item one' },
  { id: 2, name: 'Item Two', description: 'This is item two' },
];

// Get all items
export const getItems = (req: Request, res: Response) => {
  res.json(items);
};

// Get a single item by ID
export const getItem = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const item = items.find(item => item.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
};

// Create a new item
export const createItem = (req: Request, res: Response) => {
  const parseResult = itemSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ errors: parseResult.error.errors });
  }

  const newItem: Item = {
    id: items.length + 1,
    ...parseResult.data,
  };
  items.push(newItem);
  res.status(201).json(newItem);
};

// Update an existing item
export const updateItem = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(item => item.id === id);
  if (itemIndex >= 0) {
    const parseResult = itemSchema.partial().safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ errors: parseResult.error.errors });
    }

    items[itemIndex] = { ...items[itemIndex], ...parseResult.data };
    res.json(items[itemIndex]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
};

// Delete an item
export const deleteItem = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(item => item.id === id);
  if (itemIndex >= 0) {
    items = items.filter(item => item.id !== id);
    res.json({ message: 'Item deleted' });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
};
