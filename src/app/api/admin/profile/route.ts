import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireSuperAdmin } from '@/lib/api-middleware';
import bcrypt from 'bcryptjs';

export async function PUT(request: NextRequest) {
  try {
    const tokenOrError = await requireSuperAdmin(request);
    if (tokenOrError instanceof NextResponse) return tokenOrError;

    const body = await request.json();
    const { full_name, current_password, new_password } = body;

    const userId = tokenOrError.id;

    // Get current user data
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updateData: any = {};

    // Update name if provided
    if (full_name) {
      updateData.full_name = full_name;
    }

    // Update password if provided
    if (current_password && new_password) {
      // Verify current password
      const isValid = await bcrypt.compare(current_password, user.password);
      if (!isValid) {
        return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
      }

      // Hash new password
      updateData.password = await bcrypt.hash(new_password, 10);
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No updates provided' }, { status: 400 });
    }

    // Update user
    const { data, error } = await supabaseAdmin
      .from('users')
      .update(updateData)
      .eq('id', userId)
      .select('id, full_name, email, role')
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, user: data });
  } catch (error: any) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update profile' }, { status: 500 });
  }
}
