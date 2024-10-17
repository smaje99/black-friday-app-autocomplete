function cn(...args) {
  return args.filter(Boolean).join(' ');
}

export default function Search() {
  return (
    <search>
      <form className="flex justify-center mb-20">
        <div className={cn(
          "flex",
          "relative",
          "p-1",
          "bg-gradient-to-tr from-purple-600 to-blue-300",
          "rounded-full",
          "w-2/6",
        )}>
          <input
            type="search"
            className="flex-1 p-2 pl-8 rounded-full w-full"
            placeholder="Search"
          />
        </div>
      </form>
    </search>
  );
}