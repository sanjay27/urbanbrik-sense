import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Server-side validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, message: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

    if (!accessKey || accessKey === "YOUR_ACCESS_KEY_HERE") {
      // Fallback: log the submission if no access key is configured
      console.log("Contact form submission (no Web3Forms key configured):", {
        name: body.name,
        email: body.email,
        userType: body.userType || "Not specified",
        message: body.message,
      });

      return NextResponse.json({
        success: true,
        message: "Message received! We'll get back to you soon.",
      });
    }

    // Send via Web3Forms
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        name: body.name,
        email: body.email,
        user_type: body.userType || "Not specified",
        message: body.message,
        subject: "New UrbanBrik Sense Inquiry",
        from_name: "UrbanBrik Sense Website",
      }),
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({
        success: true,
        message: "Message sent successfully!",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send message. Please try again.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
