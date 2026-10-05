# Money OS component audit

The white balance hero and floating navigation remain the visual foundation. Money-specific components compose shadcn primitives; no competing UI library was introduced.

| Experience | Primary components |
| --- | --- |
| Desktop grouped navigation | Sidebar, Collapsible, Button, Avatar |
| Floating navigation and add menu | Button, Tooltip, Drawer |
| Global money search | Command, responsive Dialog / Sheet |
| Transaction and entity entry | Form, Input, Label, Textarea, Select, Command combobox |
| Dates | Popover, Calendar |
| Optional payment details | Collapsible |
| Destructive actions and demo reset | Alert Dialog |
| Desktop activity | Table, Pagination, Button |
| Mobile activity | Money-specific transaction rows, Badge |
| Finance entity surfaces | Card |
| View selectors | Tabs |
| Preferences and members | Switch, Checkbox |
| Budget and goal completion | Progress |
| Cash flow | Chart, Recharts with confirmed transaction data |
| Loading and feedback | Skeleton, Alert, Badge, Sonner |
| Profile and shared members | Avatar |

Calendar selection, searchable categories, transaction saving, global search, cancellation of destructive confirmations, mobile income entry, and goal form opening were exercised in the live app. All 20 routes were checked at 375, 390, 430, 768, 1024, 1280, and 1440px without horizontal overflow or page errors. Ten financial/routing regression tests passed.

Components without a real use case (OTP, Carousel, Resizable, Menubar) are deliberately not added. Production authentication, secure persistence, OCR, native payments and atomic shared writes still require the separately supplied backend/native host; this presentation migration does not claim those integrations are complete.