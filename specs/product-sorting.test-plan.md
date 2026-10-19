# SauceDemo Product Sorting Test Plan

## Application Overview

Verify all product sort options on the SauceDemo authenticated inventory page. Each scenario begins in a fresh browser context and uses the existing tests/seed.spec.ts seed to authenticate and reach /inventory.html. The current standard catalog contains six products. Dropdown options, labels, values, and resulting order were checked against the live inventory page during planning. This file is a test plan only; no Playwright test code is included.

## Test Scenarios

### 1. Inventory sorting options

**Seed:** `tests/seed.spec.ts`

#### 1.1. Name (A to Z) sorts all products ascending by name

**File:** `specs/product-sorting.test-plan.md`

**Steps:**
  1. In a fresh browser context, run tests/seed.spec.ts and wait for authentication to complete on the SauceDemo inventory page.
    - expect: The current URL is /inventory.html and the Products inventory page is visible.
    - expect: The Sort products dropdown is present and the six standard catalog products are visible.
    - expect: The initial selected sort option is Name (A to Z).
  2. Select Name (A to Z) in the Sort products dropdown.
    - expect: The selected dropdown label is Name (A to Z).
    - expect: Products appear top-to-bottom in this exact order: Sauce Labs Backpack ($29.99), Sauce Labs Bike Light ($9.99), Sauce Labs Bolt T-Shirt ($15.99), Sauce Labs Fleece Jacket ($49.99), Sauce Labs Onesie ($7.99), Test.allTheThings() T-Shirt (Red) ($15.99).
  3. Compare the complete displayed product name sequence and each product's associated price against the expected list.
    - expect: All six expected products appear exactly once, in ascending alphabetical name order.
    - expect: Each displayed price is associated with the correct product.
    - expect: Fail if any product is missing, duplicated, out of order, or has a different price.

#### 1.2. Name (Z to A) sorts all products descending by name

**File:** `specs/product-sorting.test-plan.md`

**Steps:**
  1. In a fresh browser context, run tests/seed.spec.ts and wait for authentication to complete on the SauceDemo inventory page.
    - expect: The current URL is /inventory.html and the Products inventory page is visible.
    - expect: The Sort products dropdown is present and the six standard catalog products are visible.
  2. Select Name (Z to A) in the Sort products dropdown.
    - expect: The selected dropdown label is Name (Z to A).
    - expect: Products appear top-to-bottom in this exact order: Test.allTheThings() T-Shirt (Red) ($15.99), Sauce Labs Onesie ($7.99), Sauce Labs Fleece Jacket ($49.99), Sauce Labs Bolt T-Shirt ($15.99), Sauce Labs Bike Light ($9.99), Sauce Labs Backpack ($29.99).
  3. Compare the complete displayed product name sequence and each product's associated price against the expected list.
    - expect: All six expected products appear exactly once, in descending alphabetical name order.
    - expect: Each displayed price is associated with the correct product.
    - expect: Fail if any product is missing, duplicated, out of order, or has a different price.

#### 1.3. Price (low to high) sorts all products ascending by price

**File:** `specs/product-sorting.test-plan.md`

**Steps:**
  1. In a fresh browser context, run tests/seed.spec.ts and wait for authentication to complete on the SauceDemo inventory page.
    - expect: The current URL is /inventory.html and the Products inventory page is visible.
    - expect: The Sort products dropdown is present and the six standard catalog products are visible.
  2. Select Price (low to high) in the Sort products dropdown.
    - expect: The selected dropdown label is Price (low to high).
    - expect: Products appear top-to-bottom in this exact order: Sauce Labs Onesie ($7.99), Sauce Labs Bike Light ($9.99), Sauce Labs Bolt T-Shirt ($15.99), Test.allTheThings() T-Shirt (Red) ($15.99), Sauce Labs Backpack ($29.99), Sauce Labs Fleece Jacket ($49.99).
  3. Compare the complete displayed product name-and-price sequence against the expected list, paying particular attention to the two products priced $15.99.
    - expect: Prices are in nondecreasing order from $7.99 through $49.99.
    - expect: The $15.99 tie appears in the observed order: Sauce Labs Bolt T-Shirt, then Test.allTheThings() T-Shirt (Red).
    - expect: All six expected products appear exactly once and each price is associated with the correct product.
    - expect: Fail if any product is missing, duplicated, out of order, or has a different price.

#### 1.4. Price (high to low) sorts all products descending by price

**File:** `specs/product-sorting.test-plan.md`

**Steps:**
  1. In a fresh browser context, run tests/seed.spec.ts and wait for authentication to complete on the SauceDemo inventory page.
    - expect: The current URL is /inventory.html and the Products inventory page is visible.
    - expect: The Sort products dropdown is present and the six standard catalog products are visible.
  2. Select Price (high to low) in the Sort products dropdown.
    - expect: The selected dropdown label is Price (high to low).
    - expect: Products appear top-to-bottom in this exact order: Sauce Labs Fleece Jacket ($49.99), Sauce Labs Backpack ($29.99), Sauce Labs Bolt T-Shirt ($15.99), Test.allTheThings() T-Shirt (Red) ($15.99), Sauce Labs Bike Light ($9.99), Sauce Labs Onesie ($7.99).
  3. Compare the complete displayed product name-and-price sequence against the expected list, paying particular attention to the two products priced $15.99.
    - expect: Prices are in nonincreasing order from $49.99 through $7.99.
    - expect: The $15.99 tie appears in the observed order: Sauce Labs Bolt T-Shirt, then Test.allTheThings() T-Shirt (Red).
    - expect: All six expected products appear exactly once and each price is associated with the correct product.
    - expect: Fail if any product is missing, duplicated, out of order, or has a different price.
