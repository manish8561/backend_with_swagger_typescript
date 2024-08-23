/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the item
 *         name:
 *           type: string
 *           description: The name of the item
 *         description:
 *           type: string
 *           description: The description of the item
 *       example:
 *         id: 1
 *         name: Item One
 *         description: This is item one
 */
export interface Item {
  id: number;
  name: string;
  description: string;
}
