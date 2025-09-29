export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'fa',
  messages: {
    fa: {
      // General
      loading: 'در حال بارگذاری...',
      logout: 'خروج',
      login: 'ورود',
      profile: 'پروفایل',

      // Login Page
      login_page_title: 'ورود به حساب کاربری',
      login_to_account: 'ورود به حساب',
      email_or_mobile: 'ایمیل یا موبایل',
      enter_email_or_mobile: 'ایمیل یا موبایل خود را وارد کنید',
      password: 'رمز عبور',
      enter_password: 'رمز عبور خود را وارد کنید',
      login_failed: 'اطلاعات ورود نامعتبر است.',

      // Profile Page
      profile_page_title: 'پروفایل کاربری',
      user_name: 'نام',
      user_email: 'ایمیل',
      user_username: 'نام کاربری',
      not_provided: 'ثبت نشده',

      // Buttons & Actions
      save_changes: 'ذخیره تغییرات',
      logging_in: 'در حال ورود...',
      logging_out: 'در حال خروج...',

      // Profile Edit Page
      profile_edit_page_title: 'ویرایش پروفایل',
      profile_update_success: 'پروفایل با موفقیت به‌روزرسانی شد.',
      profile_update_failed: 'خطایی در به‌روزرسانی پروفایل رخ داد.',

      // Password Management Page
      password_management_title: 'مدیریت رمز عبور',
      change_password_title: 'تغییر رمز عبور',
      set_password_title: 'تنظیم رمز عبور',
      current_password: 'رمز عبور فعلی',
      new_password: 'رمز عبور جدید',
      confirm_new_password: 'تکرار رمز عبور جدید',
      confirm_password: 'تکرار رمز عبور',
      change_password_action: 'تغییر رمز',
      set_password_action: 'تنظیم رمز',
      password_set_success: 'رمز عبور با موفقیت تنظیم شد.',
      password_set_failed: 'خطا در تنظیم رمز عبور.',
      password_change_success: 'رمز عبور با موفقیت تغییر کرد.',
      password_change_failed: 'خطا در تغییر رمز عبور. (رمز فعلی اشتباه است؟)',

      // Profile Page Actions
      edit_profile: 'ویرایش پروفایل',
      manage_password: 'مدیریت رمز عبور',
      refresh_data: 'بازخوانی اطلاعات',
      settings: 'تنظیمات',

      // Admin Layout
      admin_panel: 'پنل مدیریت',
      user_management: 'مدیریت کاربران',
      role_management: 'مدیریت نقش‌ها',
      back_to_profile: 'بازگشت به پروفایل',

      // Admin Role List Page
      role_name: 'نام سیستمی',
      role_display_name: 'نام نمایشی',
      role_description: 'توضیحات',
      users_count: 'تعداد کاربران',
      create_new_role: 'ایجاد نقش جدید',
      edit_role: 'ویرایش',
      delete_role: 'حذف',
      roles_fetch_error: 'خطا در دریافت لیست نقش‌ها.',
      confirm_delete_role: 'آیا از حذف این نقش اطمینان دارید؟ این عمل غیرقابل بازگشت است.',
      role_delete_success: 'نقش با موفقیت حذف شد.',
      role_delete_failed: 'خطا در حذف نقش.',

      // Admin Role Create/Edit Page
      create_role_title: 'ایجاد نقش جدید',
      edit_role_title: 'ویرایش نقش',
      assign_permissions: 'تخصیص دسترسی‌ها',
      permissions_fetch_error: 'خطا در دریافت لیست دسترسی‌ها.',
      role_create_success: 'نقش با موفقیت ایجاد شد.',
      role_create_failed: 'خطا در ایجاد نقش.',
      role_update_success: 'نقش با موفقیت به‌روزرسانی شد.',
      role_update_failed: 'خطا در به‌روزرسانی نقش.',

      // Admin Permissions Management
      permission_management: 'مدیریت دسترسی‌ها',
      permission_name: 'نام سیستمی (مثلا: users.create)',
      permission_display_name: 'نام نمایشی',
      permission_group: 'گروه',
      permission_description: 'توضیحات',
      create_new_permission: 'ایجاد دسترسی جدید',
      edit_permission: 'ویرایش دسترسی',
      delete_permission: 'حذف دسترسی',
      confirm_delete_permission: 'آیا از حذف این دسترسی اطمینان دارید؟',
      permission_delete_success: 'دسترسی با موفقیت حذف شد.',
      permission_delete_failed: 'خطا در حذف دسترسی.',
      permission_create_success: 'دسترسی با موفقیت ایجاد شد.',
      permission_create_failed: 'خطا در ایجاد دسترسی.',
      permission_update_success: 'دسترسی با موفقیت به‌روزرسانی شد.',
      permission_update_failed: 'خطا در به‌روزرسانی دسترسی.',

      // General
      redirecting: 'در حال انتقال...',

      // Auth Layout
      auth_layout_welcome: 'به آینده بهره‌وری خوش آمدید',

      // Admin User Management Page
      search_users_placeholder: 'جستجوی کاربران (بر اساس نام، ایمیل...)',
      roles: 'نقش‌ها',
      status: 'وضعیت',
      actions: 'عملیات',
      users_fetch_error: 'خطا در دریافت لیست کاربران.',
      locked: 'قفل شده',
      active: 'فعال',
      pagination_showing: 'نمایش {from} تا {to} از {total} نتیجه',
      previous: 'قبلی',
      next: 'بعدی',

      // Admin User Actions
      view_edit: 'مشاهده/ویرایش',
      toggle_lock: 'قفل/آزاد کردن',
      delete_user: 'حذف کاربر',
      confirm_action: 'آیا مطمئن هستید؟',
      confirm_lock_user: 'آیا از تغییر وضعیت قفل این کاربر اطمینان دارید؟',
      confirm_delete_user: 'این عمل غیرقابل بازگشت است. آیا از حذف این کاربر اطمینان دارید؟',
      user_lock_success: 'وضعیت کاربر با موفقیت تغییر کرد.',
      user_lock_failed: 'خطا در تغییر وضعیت کاربر.',
      user_delete_success: 'کاربر با موفقیت حذف شد.',
      user_delete_failed: 'خطا در حذف کاربر.',

      // Admin User Edit Page
      edit_user_title: 'ویرایش کاربر: {name}',
      user_details: 'جزئیات کاربر',
      user_fetch_error: 'خطا در دریافت اطلاعات کاربر.',
      user_update_success: 'اطلاعات کاربر با موفقیت به‌روزرسانی شد.',
      user_update_failed: 'خطا در به‌روزرسانی اطلاعات کاربر.',

      // Admin Role Management
      manage_user_roles: 'مدیریت نقش‌های کاربر',
      roles_update_success: 'نقش‌های کاربر با موفقیت به‌روزرسانی شد.',
      roles_update_failed: 'خطا در به‌روزرسانی نقش‌های کاربر.',
      no_roles_available: 'هیچ نقشی برای تخصیص وجود ندارد.',
    }
  }
}))