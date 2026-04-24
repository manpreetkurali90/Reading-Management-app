Layout
Containers
.container: Responsive fixed-width container.

.container-fluid: Full-width container spanning the entire width of the viewport.

.container-{breakpoint}: Responsive containers (sm, md, lg, xl, xxl).

Grid System
.row: Creates a horizontal group of columns.

.col: Equal-width columns.

.col-{breakpoint}-{1-12}: Columns for specific breakpoints.

E.g., .col-md-6 (spans 6 columns on medium devices).

.g-{0-5}: Gutter spacing for rows and columns.

E.g., .g-3 adds a 1rem gutter.

Utilities for Layout
Display: .d-{value} (e.g., .d-none, .d-flex).

Flex: .flex-{direction}, .justify-content-{}, .align-items-{}.

Order: .order-{1-12}, .order-first, .order-last.

Offset: .offset-{breakpoint}-{1-12}.

Content
Typography
Headings: <h1> to <h6>, .h1 to .h6.

Display Headings: .display-{1-6}.

Lead Text: .lead for standout text.

Text Alignment: .text-start, .text-center, .text-end.

Text Color: .text-{color} (e.g., .text-primary).

Text Transform: .text-lowercase, .text-uppercase, .text-capitalize.

Images
Responsive Images: .img-fluid (max-width: 100%; height: auto).

Image Shapes: .rounded, .rounded-circle, .img-thumbnail.

Tables
Base Class: .table.

Variants: .table-striped, .table-bordered, .table-hover, .table-dark, .table-sm.

Components
Alerts
Base Class: .alert.

Variants: .alert-{color} (e.g., .alert-success, .alert-danger).

Badges
Base Class: .badge.

Variants: .bg-{color} (e.g., .bg-primary).

Breadcrumbs
Base Class: .breadcrumb.

Items: .breadcrumb-item.

Buttons
Base Class: .btn.

Variants: .btn-{color}, .btn-outline-{color}.

Sizes: .btn-lg, .btn-sm, .btn-block.

Cards
Container: .card.

Content Areas: .card-body, .card-title, .card-text, .card-header, .card-footer.

Image Caps: .card-img-top, .card-img-bottom.

Dropdowns
Container: .dropdown.

Toggle Button: .dropdown-toggle, data-bs-toggle="dropdown".

Menu: .dropdown-menu.

Items: .dropdown-item, .dropdown-divider, .dropdown-header.

Forms
Input Fields: .form-control.

Labels: .form-label.

Form Layout: .row, .col.

Checkboxes and Radios: .form-check, .form-check-input, .form-check-label.

Select Menus: .form-select.

Input Groups: .input-group, .input-group-text.

Navbar

Positioning and Color
.navbar-expand-[sm|md|lg|xl|xxl] - Responsive collapsing classes for different breakpoints.

.navbar-light - For a light-themed navbar.

.navbar-dark - For a dark-themed navbar.

.bg-[color] - To change the background color (e.g., .bg-light, .bg-dark, .bg-primary).

Container: .navbar.

Brand: .navbar-brand.

Navigation: .navbar-nav, .nav-item, .nav-link.

Toggle: .navbar-toggler, .navbar-toggler-icon.

Collapsible Content: .collapse, .navbar-collapse.

Modals
Container: .modal, tabindex="-1".

Dialog: .modal-dialog.

Content: .modal-content, .modal-header, .modal-body, .modal-footer.

Close Button: .btn-close, data-bs-dismiss="modal".

Pagination
Container: .pagination.

Items: .page-item, .page-link.

Sizes: .pagination-lg, .pagination-sm.

Utilities
Spacing
Margin: .m{t|b|s|e|x|y}-{0-5|auto}.

E.g., .mt-3 (margin-top: 1rem).

Padding: .p{t|b|s|e|x|y}-{0-5}.

E.g., .px-2 (padding-left and padding-right: 0.5rem).

Color & Background
Text Color: .text-{color}.

Background Color: .bg-{color}.

Colors: primary, secondary, success, danger, warning, info, light, dark, white.

Borders
Add Borders: .border.

Border Sides: .border-{side} (e.g., .border-top).

Border Color: .border-{color}.

Border Radius: .rounded, .rounded-{side}, .rounded-0.

Display
Display Property: .d-{value}.

Values: none, inline, inline-block, block, grid, table, flex, etc.

Responsive Display: .d-{breakpoint}-{value}.

E.g., .d-md-none hides element on medium devices and up.

Flexbox Utilities
Direction: .flex-row, .flex-column, .flex-row-reverse, .flex-column-reverse.

Wrap: .flex-wrap, .flex-nowrap, .flex-wrap-reverse.

Justify Content: .justify-content-start, .justify-content-center, .justify-content-end, .justify-content-between, .justify-content-around, .justify-content-evenly.

Align Items: .align-items-start, .align-items-center, .align-items-end, .align-items-stretch.

Sizing
Width and Height: .w-{25|50|75|100|auto}, .h-{25|50|75|100|auto}.

Max Width and Height: .mw-100, .mh-100.

Position
Position Types: .position-static, .position-relative, .position-absolute, .position-fixed, .position-sticky.

Offsets: .top-{0|50|100}, .bottom-{0|50|100}, .start-{0|50|100}, .end-{0|50|100}.

Overflow
Overflow Classes: .overflow-auto, .overflow-hidden, .overflow-visible, .overflow-scroll.

Helpers
Float
Floating Elements: .float-start, .float-end, .float-none.

Text
Wrapping & Overflow: .text-wrap, .text-nowrap, .text-truncate.

Text Decoration: .text-decoration-none, .text-decoration-underline.

Font Weight & Style: .fw-bold, .fw-normal, .fst-italic, .fst-normal.

Visibility
Visible or Hidden: .visible, .invisible.