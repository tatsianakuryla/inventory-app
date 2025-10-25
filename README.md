Users (/api/users)
GET /api/users/me - Get current user's profile
PATCH /api/users/me - Update user profile
GET /api/users/autocomplete - Search users
POST /api/users/register - Register a new user
POST /api/users/login - Login
POST /api/users/google/login - Google login
POST /api/users/facebook/login - Facebook login
Admin (/api/admin)
GET /api/admin/users - Get all users (admin only)
POST /api/admin/users/block - Block user (admin only)
POST /api/admin/users/unblock - Unblock user (admin only)
POST /api/admin/users/change-role - Change user role (admin only)
Inventory (/api/inventory)
POST /api/inventory - Create new inventory
GET /api/inventory - Get all inventories
GET /api/inventory/:inventoryId - Get inventory by ID
PATCH /api/inventory/:inventoryId - Update inventory
DELETE /api/inventory - Delete multiple inventories
GET /api/inventory/:inventoryId/access - Get inventory access data
PUT /api/inventory/:inventoryId/access - Update inventory access
DELETE /api/inventory/:inventoryId/access - Revoke inventory access
PUT /api/inventory/:inventoryId/fields - Update inventory fields
PUT /api/inventory/:inventoryId/id-format - Update ID format
GET /api/inventory/:inventoryId/statistics - Get inventory statistics
Items (/api/items)
GET /api/items - Get all items
GET /api/items/:itemId - Get item by ID
POST /api/items - Create new item
PATCH /api/items/:itemId - Update item
DELETE /api/items - Delete multiple items
GET /api/items/export - Export items
Categories (/api/categories)
GET /api/categories - Get all categories
POST /api/categories - Create new category
PATCH /api/categories/:categoryId - Update category
DELETE /api/categories - Delete categories
Tags (/api/tags)
GET /api/tags - Get all tags
POST /api/tags - Create new tag
DELETE /api/tags - Delete tags
Discussions (/api/discussions)
GET /api/discussions - Get all discussions
POST /api/discussions - Create new discussion
GET /api/discussions/:discussionId - Get discussion by ID
POST /api/discussions/:discussionId/comments - Add comment to discussion
DELETE /api/discussions/:discussionId - Delete discussion
Home (/api/home)
GET /api/home/stats - Get home page statistics
GET /api/home/activity - Get recent activity
