import "./Sign.scss";

const Sign = ({ open, onClose, onSignClick, onLoginClick }) => {
  if (!open) return null;

  return (
    <div className="sign-btn-container" onClick={onClose}>
      <form
        onClick={(e) => e.stopPropagation}
        className="sign-btns bg-transparent"
      >
        <div className="sign-btns__buttons">
          <button
            typr="button"
            className="sign-btns__button sign-btns__button--signup"
            onClick={() => {
              onSignClick();
            }}
          >
            Sign Up
          </button>
          <button
            type="button"
            className="sign-btns__button sign-btns__button--login"
            onClick={() => {
              onLoginClick();
            }}
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Sign;
