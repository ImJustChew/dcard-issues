'use client'
import Link from "next/link";
import { AlertOctagon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {

 
  return (
    <div className='h-[--content-height] w-screen overflow-x-clip grid place-items-center px-4'>
      <Alert
        variant="destructive"
        color="danger"
      >
        <AlertOctagon/>
        <AlertTitle>{'Something went wrong'}</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
        <div className="flex flex-row justify-end gap-1">
          <Link href="https://github.com/nthumodifications/courseweb/issues/new/choose">
            <Button variant="destructive" size="sm">
              Report issue
            </Button>
          </Link>
          <Button
            variant='outline'
            size="sm"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </Button>
        </div>
      </Alert>
    </div>
  )
}
