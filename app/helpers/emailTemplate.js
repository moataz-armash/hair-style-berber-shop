// Admin notification email template
function getAdminEmailTemplate({
  name,
  phone,
  email,
  branchId,
  offerId,
  date,
  time,
  paymentMethod,
}) {
  return `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>حجز جديد</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa; direction: rtl;">
      <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f4f7fa;">
        <tr>
          <td style="padding: 40px 20px;">
            <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: 0.5px;">
                    ✂️ Hair Style
                  </h1>
                  <p style="margin: 10px 0 0 0; color: #f0f0f0; font-size: 16px;">
                    حجز جديد وصل للتو!
                  </p>
                </td>
              </tr>

              <!-- Alert Badge -->
              <tr>
                <td style="padding: 0;">
                  <div style="background-color: #10b981; color: white; text-align: center; padding: 12px; font-weight: 600; font-size: 14px;">
                    🔔 عميل جديد في انتظار التأكيد
                  </div>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="margin: 0 0 25px 0; color: #1f2937; font-size: 22px; font-weight: 600; border-right: 4px solid #667eea; padding-right: 15px;">
                    تفاصيل الحجز
                  </h2>

                  <table role="presentation" style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 15px; background-color: #f9fafb; border-radius: 8px; margin-bottom: 10px;">
                        <table role="presentation" style="width: 100%;">
                          <tr>
                            <td style="width: 40px; vertical-align: top;">
                              <div style="background-color: #667eea; color: white; width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px;">
                                👤
                              </div>
                            </td>
                            <td style="padding-right: 15px; vertical-align: top;">
                              <div style="color: #6b7280; font-size: 13px; margin-bottom: 4px;">اسم العميل</div>
                              <div style="color: #1f2937; font-size: 16px; font-weight: 600;">${escapeHtml(
                                name
                              )}</div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <tr><td style="height: 10px;"></td></tr>

                    <tr>
                      <td style="padding: 15px; background-color: #f9fafb; border-radius: 8px;">
                        <table role="presentation" style="width: 100%;">
                          <tr>
                            <td style="width: 40px; vertical-align: top;">
                              <div style="background-color: #10b981; color: white; width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px;">
                                📱
                              </div>
                            </td>
                            <td style="padding-right: 15px; vertical-align: top;">
                              <div style="color: #6b7280; font-size: 13px; margin-bottom: 4px;">رقم الجوال</div>
                              <div style="color: #1f2937; font-size: 16px; font-weight: 600;">
                                <a href="tel:${escapeHtml(
                                  phone
                                )}" style="color: #10b981; text-decoration: none;">${escapeHtml(
                                  phone
                                )}</a>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    ${
                      email
                        ? `
                    <tr><td style="height: 10px;"></td></tr>
                    <tr>
                      <td style="padding: 15px; background-color: #f9fafb; border-radius: 8px;">
                        <table role="presentation" style="width: 100%;">
                          <tr>
                            <td style="width: 40px; vertical-align: top;">
                              <div style="background-color: #f59e0b; color: white; width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px;">
                                📧
                              </div>
                            </td>
                            <td style="padding-right: 15px; vertical-align: top;">
                              <div style="color: #6b7280; font-size: 13px; margin-bottom: 4px;">البريد الإلكتروني</div>
                              <div style="color: #1f2937; font-size: 16px; font-weight: 600;">
                                <a href="mailto:${escapeHtml(
                                  email
                                )}" style="color: #f59e0b; text-decoration: none;">${escapeHtml(
                                  email
                                )}</a>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    `
                        : ""
                    }

                    <tr><td style="height: 10px;"></td></tr>

                    <tr>
                      <td style="padding: 15px; background-color: #fef3c7; border-radius: 8px; border: 2px solid #fbbf24;">
                        <table role="presentation" style="width: 100%;">
                          <tr>
                            <td style="width: 40px; vertical-align: top;">
                              <div style="background-color: #f59e0b; color: white; width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px;">
                                📅
                              </div>
                            </td>
                            <td style="padding-right: 15px; vertical-align: top;">
                              <div style="color: #92400e; font-size: 13px; margin-bottom: 4px;">موعد الحجز</div>
                              <div style="color: #78350f; font-size: 18px; font-weight: 700;">
                                ${escapeHtml(date)} • ${escapeHtml(time)}
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <tr><td style="height: 10px;"></td></tr>

                    <tr>
                      <td style="padding: 15px; background-color: #f9fafb; border-radius: 8px;">
                        <table role="presentation" style="width: 100%;">
                          <tr>
                            <td style="width: 40px; vertical-align: top;">
                              <div style="background-color: #8b5cf6; color: white; width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px;">
                                🏢
                              </div>
                            </td>
                            <td style="padding-right: 15px; vertical-align: top;">
                              <div style="color: #6b7280; font-size: 13px; margin-bottom: 4px;">الفرع</div>
                              <div style="color: #1f2937; font-size: 16px; font-weight: 600;">${escapeHtml(
                                branchId
                              )}</div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <tr><td style="height: 10px;"></td></tr>

                    <tr>
                      <td style="padding: 15px; background-color: #f9fafb; border-radius: 8px;">
                        <table role="presentation" style="width: 100%;">
                          <tr>
                            <td style="width: 40px; vertical-align: top;">
                              <div style="background-color: #ec4899; color: white; width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px;">
                                ✨
                              </div>
                            </td>
                            <td style="padding-right: 15px; vertical-align: top;">
                              <div style="color: #6b7280; font-size: 13px; margin-bottom: 4px;">الباقة المختارة</div>
                              <div style="color: #1f2937; font-size: 16px; font-weight: 600;">${escapeHtml(
                                offerId
                              )}</div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <tr><td style="height: 10px;"></td></tr>

                    <tr>
                      <td style="padding: 15px; background-color: #f9fafb; border-radius: 8px;">
                        <table role="presentation" style="width: 100%;">
                          <tr>
                            <td style="width: 40px; vertical-align: top;">
                              <div style="background-color: #06b6d4; color: white; width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px;">
                                💳
                              </div>
                            </td>
                            <td style="padding-right: 15px; vertical-align: top;">
                              <div style="color: #6b7280; font-size: 13px; margin-bottom: 4px;">طريقة الدفع</div>
                              <div style="color: #1f2937; font-size: 16px; font-weight: 600;">
                                ${
                                  paymentMethod === "cash"
                                    ? "💵 الدفع كاش عند الوصول"
                                    : "💳 الدفع الإلكتروني"
                                }
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- Action Button -->
                  <div style="margin-top: 35px; text-align: center;">
                    <a href="tel:${escapeHtml(
                      phone
                    )}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 16px 40px; border-radius: 12px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
                      📞 اتصل بالعميل الآن
                    </a>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #f9fafb; padding: 25px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                  <p style="margin: 0; color: #6b7280; font-size: 13px;">
                    تم إرسال هذا البريد تلقائيًا من نظام الحجز
                  </p>
                  <p style="margin: 8px 0 0 0; color: #9ca3af; font-size: 12px;">
                    Hair Style Salon © 2025
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

// Customer confirmation email template
function getCustomerEmailTemplate({
  name,
  branchId,
  offerId,
  date,
  time,
  paymentMethod,
}) {
  return `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>تأكيد الحجز</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa; direction: rtl;">
      <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f4f7fa;">
        <tr>
          <td style="padding: 40px 20px;">
            <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 50px 30px; text-align: center;">
                  <div style="background-color: rgba(255,255,255,0.2); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 40px;">
                    ✂️
                  </div>
                  <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: 0.5px;">
                    Hair Style
                  </h1>
                  <p style="margin: 12px 0 0 0; color: #f0f0f0; font-size: 16px; opacity: 0.95;">
                    صالون تجميل وعناية بالشعر
                  </p>
                </td>
              </tr>

              <!-- Success Badge -->
              <tr>
                <td style="padding: 0;">
                  <div style="background-color: #10b981; color: white; text-align: center; padding: 15px; font-weight: 600; font-size: 16px;">
                    ✅ تم استلام طلب حجزك بنجاح!
                  </div>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <div style="text-align: center; margin-bottom: 30px;">
                    <h2 style="margin: 0 0 10px 0; color: #1f2937; font-size: 24px; font-weight: 700;">
                      أهلاً ${escapeHtml(name)} 👋
                    </h2>
                    <p style="margin: 0; color: #6b7280; font-size: 16px; line-height: 1.6;">
                      يسعدنا استقبالك في صالوننا<br/>
                      سنتواصل معك قريبًا لتأكيد موعدك
                    </p>
                  </div>

                  <!-- Appointment Details Card -->
                  <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 25px; margin: 30px 0; border: 2px solid #fbbf24;">
                    <div style="text-align: center; margin-bottom: 20px;">
                      <div style="font-size: 14px; color: #92400e; font-weight: 600; margin-bottom: 8px;">
                        📅 موعدك المحجوز
                      </div>
                      <div style="font-size: 28px; font-weight: 700; color: #78350f; margin-bottom: 4px;">
                        ${escapeHtml(date)}
                      </div>
                      <div style="font-size: 22px; font-weight: 600; color: #92400e;">
                        ⏰ ${escapeHtml(time)}
                      </div>
                    </div>
                  </div>

                  <!-- Details Grid -->
                  <table role="presentation" style="width: 100%; margin: 25px 0;">
                    <tr>
                      <td style="width: 50%; padding: 15px; vertical-align: top;">
                        <div style="background-color: #f9fafb; border-radius: 10px; padding: 20px; height: 100%; text-align: center;">
                          <div style="font-size: 30px; margin-bottom: 10px;">🏢</div>
                          <div style="color: #6b7280; font-size: 13px; margin-bottom: 6px;">الفرع</div>
                          <div style="color: #1f2937; font-size: 16px; font-weight: 600;">${escapeHtml(
                            branchId
                          )}</div>
                        </div>
                      </td>
                      <td style="width: 50%; padding: 15px; vertical-align: top;">
                        <div style="background-color: #f9fafb; border-radius: 10px; padding: 20px; height: 100%; text-align: center;">
                          <div style="font-size: 30px; margin-bottom: 10px;">✨</div>
                          <div style="color: #6b7280; font-size: 13px; margin-bottom: 6px;">الباقة</div>
                          <div style="color: #1f2937; font-size: 16px; font-weight: 600;">${escapeHtml(
                            offerId
                          )}</div>
                        </div>
                      </td>
                    </tr>
                  </table>

                  <!-- Payment Info -->
                  <div style="background-color: ${
                    paymentMethod === "cash" ? "#dbeafe" : "#d1fae5"
                  }; border-radius: 10px; padding: 20px; text-align: center; margin: 25px 0;">
                    <div style="font-size: 30px; margin-bottom: 10px;">
                      ${paymentMethod === "cash" ? "💵" : "💳"}
                    </div>
                    <div style="color: ${
                      paymentMethod === "cash" ? "#1e40af" : "#065f46"
                    }; font-size: 14px; margin-bottom: 6px; font-weight: 600;">
                      طريقة الدفع
                    </div>
                    <div style="color: ${
                      paymentMethod === "cash" ? "#1e3a8a" : "#064e3b"
                    }; font-size: 16px; font-weight: 700;">
                      ${
                        paymentMethod === "cash"
                          ? "الدفع كاش عند الوصول"
                          : "الدفع الإلكتروني"
                      }
                    </div>
                  </div>

                  <!-- Important Notes -->
                  <div style="background-color: #fef2f2; border-right: 4px solid #ef4444; border-radius: 8px; padding: 20px; margin: 30px 0;">
                    <div style="color: #991b1b; font-weight: 600; font-size: 15px; margin-bottom: 12px;">
                      📌 ملاحظات مهمة:
                    </div>
                    <ul style="margin: 0; padding-right: 20px; color: #7f1d1d; font-size: 14px; line-height: 1.8;">
                      <li>الرجاء الوصول قبل الموعد بـ 10 دقائق</li>
                      <li>في حالة التأخير أكثر من 15 دقيقة، قد يتم إلغاء الحجز</li>
                      <li>للإلغاء أو التعديل، تواصل معنا قبل 24 ساعة</li>
                    </ul>
                  </div>

                  <!-- Contact Section -->
                  <div style="text-align: center; margin-top: 35px; padding: 25px; background-color: #f9fafb; border-radius: 12px;">
                    <p style="margin: 0 0 15px 0; color: #4b5563; font-size: 15px; font-weight: 600;">
                      هل لديك استفسار؟
                    </p>
                    <a href="tel:+966XXXXXXXXX" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 14px 35px; border-radius: 10px; font-weight: 600; font-size: 15px; margin: 5px; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);">
                      📞 اتصل بنا
                    </a>
                    <a href="https://wa.me/966XXXXXXXXX" style="display: inline-block; background-color: #25d366; color: white; text-decoration: none; padding: 14px 35px; border-radius: 10px; font-weight: 600; font-size: 15px; margin: 5px; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);">
                      💬 واتساب
                    </a>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #1f2937; padding: 30px; text-align: center;">
                  <p style="margin: 0 0 10px 0; color: #f3f4f6; font-size: 15px; font-weight: 600;">
                    نتطلع لرؤيتك قريبًا ✨
                  </p>
                  <p style="margin: 0; color: #9ca3af; font-size: 13px;">
                    Hair Style Salon © 2025
                  </p>
                  <div style="margin-top: 15px;">
                    <a href="#" style="color: #9ca3af; text-decoration: none; margin: 0 10px; font-size: 12px;">Instagram</a>
                    <span style="color: #4b5563;">•</span>
                    <a href="#" style="color: #9ca3af; text-decoration: none; margin: 0 10px; font-size: 12px;">Facebook</a>
                    <span style="color: #4b5563;">•</span>
                    <a href="#" style="color: #9ca3af; text-decoration: none; margin: 0 10px; font-size: 12px;">TikTok</a>
                  </div>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

function escapeHtml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export { getAdminEmailTemplate, getCustomerEmailTemplate };
