import React from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Person, Social } from "../../types";
import psl, { ParsedDomain, ParseError } from "psl";
import { socialMedia } from "../../constants";

type Props = {
  user: Person;
};

const defaultIcon =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1200px-User_font_awesome.svg.png";

function socialIcon({ socialProfileUrl }: Social): String {
  let hostname = new URL(socialProfileUrl.valueOf()).hostname;
  let parse: ParsedDomain | ParseError = psl.parse(hostname);

  if (parse.error) {
    return defaultIcon;
  }

  let success = parse as ParsedDomain;

  return socialMedia.get(success.sld)?.logo || defaultIcon;
}

const SocialMedia = (props: Props) => {
  if (props.user.socials.length == 0) {
    return <div></div>;
  }

  return (
    <div>
      <div className="font-weight-bold font-size-18-md">Redes sociales</div>
      <div>
        {props.user.socials.map((s, idx) => (
          <a
            key={idx}
            className="qui-user-profile-icon"
            href={s.socialProfileUrl.valueOf()}
            target="_blank"
          >
            <img
              className="qui-user-profile-icon"
              src={socialIcon(s).valueOf()}
              alt={s.socialName.valueOf()}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default hot(module)(SocialMedia);
