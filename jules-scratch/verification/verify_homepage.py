from playwright.sync_api import Page, expect

def test_homepage_screenshot(page: Page):
    """
    This test navigates to the homepage and takes a screenshot.
    """
    # 1. Arrange: Go to the homepage.
    # The dev server for Nuxt usually runs on port 3000.
    page.goto("http://localhost:3000")

    # 2. Assert: Check for the main heading to ensure the page has loaded.
    heading = page.get_by_role("heading", name="به وبسایت ما خوش آمدید")
    expect(heading).to_be_visible()

    # 3. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/verification.png")