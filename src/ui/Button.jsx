function Button({ children, onClick, type }) {
  return (
    <button
      className={`px-4 py-2 font-semibold cursor-pointer rounded-l transition border border-border focus:outline-none 
       `}
      onClick={() => {
        onClick(type)
      }}
      type="button"
    >
      {children}
    </button>
  )
}

export default Button
