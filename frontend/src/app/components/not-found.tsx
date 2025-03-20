"use client";

export function NotFound(props: { message: string }) {
  return (
    <>
      <div className="col-span-full text-center py-8">
        <p className="text-gray-500">
          {props.message}
        </p>
      </div>
    </>
  );
}
