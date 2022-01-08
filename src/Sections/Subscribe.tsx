import React, { FC, useState } from "react";
import { Anchor } from "../Shared/Links";

const Subscribe: FC = () => {
  const [value, setValue] = useState("");
  return (
    <>
      <form
        action="https://gmail.us20.list-manage.com/subscribe/post?u=2caeb6d129f91fce232575ff5&amp;id=8538e01768"
        method="post"
        id="#mc_embed_signup"
      >
        <label htmlFor="mce-EMAIL">Subscribe </label>
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
          style={{ marginLeft: "10px" }}
        >
          Subscribe
        </button>
      </form>
      <p>
        Don't worry, no spam. I publish the article - you receive an email. It
        will be 1 or two emails in a month.
      </p>
      <p>
        RSS feed is available
        <Anchor href="https://catchts.com/api/rss" text="here" /> thanks to
        <Anchor href="https://twitter.com/drlehr" text="Daniel" />.
      </p>
    </>
  );
};

export default Subscribe;
