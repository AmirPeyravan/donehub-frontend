import time
from playwright.sync_api import sync_playwright, expect

def run_verification(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Go to registration page
        page.goto("http://localhost:3000/register")

        # Generate a unique username for each run
        unique_username = f"testuser_{int(time.time())}"

        # Fill out registration form
        page.get_by_label("Username").fill(unique_username)
        page.get_by_label("Password").fill("password123")
        page.get_by_label("Confirm Password").fill("password123")

        # Submit form
        page.get_by_role("button", name="Register").click()

        # Wait for successful registration and redirection to dashboard
        expect(page).to_have_url("http://localhost:3000/", timeout=10000)
        expect(page.get_by_role("heading", name=f"Welcome back, {unique_username}!")).to_be_visible()

        # Take screenshot of dashboard after registration
        page.screenshot(path="jules-scratch/verification/01_dashboard_after_register.png")

        # Logout
        page.get_by_role("button", name="Logout").click()

        # Wait for redirection to login page
        expect(page).to_have_url("http://localhost:3000/login", timeout=5000)
        expect(page.get_by_role("heading", name="Login")).to_be_visible()

        # Fill out login form
        page.get_by_label("Username").fill(unique_username)
        page.get_by_label("Password").fill("password123")

        # Submit form
        page.get_by_role("button", name="Login").click()

        # Wait for successful login and redirection to dashboard
        expect(page).to_have_url("http://localhost:3000/", timeout=10000)
        expect(page.get_by_role("heading", name=f"Welcome back, {unique_username}!")).to_be_visible()

        # Take final screenshot of dashboard after login
        page.screenshot(path="jules-scratch/verification/02_dashboard_after_login.png")

        print("Verification script completed successfully.")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)