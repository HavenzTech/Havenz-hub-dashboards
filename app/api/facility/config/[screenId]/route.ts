import { NextResponse } from "next/server";
import { mockScreenConfigs } from "@/lib/data/facility-mock";

/**
 * Local mock API for screen config.
 * This stands in for the havenzbms backend until screen config endpoints are built.
 * Returns mock config for any screen-1 through screen-13.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ screenId: string }> }
) {
  const { screenId } = await params;
  const config = mockScreenConfigs[screenId];

  if (!config) {
    return NextResponse.json(
      { error: `Screen ${screenId} not configured` },
      { status: 404 }
    );
  }

  return NextResponse.json(config);
}
