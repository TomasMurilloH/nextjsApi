import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/modals/user";

export async function GET() {
  try{
    await connect();
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), {
      status: 200});
  } catch (error: any) {
    return new NextResponse("Error fetching users", {
      status: 500,
    });
  }
};

export async function POST(request: Request) {
  try {
    await connect();
    const { name, email, lastname, password } = await request.json();
    const newUser = new User({ name, email, lastname, password });
    await newUser.save();
    return new NextResponse(JSON.stringify(newUser), {
      status: 201,
    });
  } catch (error: any) {
    return new NextResponse("Error creating user", {
      status: 500,
    });
  }
};

export async function DELETE(request: Request) {
  try {
    await connect();
    const { id } = await request.json();
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return new NextResponse("User not found", {
        status: 404,
      });
    }
    return new NextResponse("User deleted successfully", {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse("Error deleting user", {
      status: 500,
    });
  }
};

export async function PATCH(request: Request) {
  try {
    await connect();
    const { id, name, email, lastname, password } = await request.json();
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, lastname, password },
      { new: true }
    );
    if (!updatedUser) {
      return new NextResponse("User not found", {
        status: 404,
      });
    }
    return new NextResponse(JSON.stringify(updatedUser), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse("Error updating user", {
      status: 500,
    });
  }
};
// This code defines a set of API routes for managing users in a MongoDB database using Mongoose.

