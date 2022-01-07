import React, { FC, useState } from "react";

const Subscribe: FC = () => {
  const [value, setValue] = useState("");
  return (
    <>
      <form
        action="https://gmail.us20.list-manage.com/subscribe/post?u=2caeb6d129f91fce232575ff5&amp;id=8538e01768"
        method="post"
        id="#mc_embed_signup"
      >
        <label htmlFor="mce-EMAIL">Subscribe</label>
        <input
          type="email"
          value={value}
          name="EMAIL"
          className="email"
          id="mce-EMAIL"
          placeholder="email address"
          required
          onChange={(e) => setValue(e.target.value)}
        ></input>
        <button
          type="submit"
          value="Subscribe"
          name="subscribe"
          id="mc-embedded-subscribe"
        >
          Subscribe
        </button>
      </form>
    </>
  );
};

export default Subscribe;
