CREATE TABLE gallery_user (
  id VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  nickname VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
CREATE TABLE gallery_image (
  id VARCHAR(255) UNIQUE PRIMARY KEY NOT NULL,
  subtitle VARCHAR(255) NOT NULL,
  author_id VARCHAR(255) NOT NULL,
  publication_date DATE NOT NULL,
  file VARCHAR(255) UNIQUE NOT NULL,
  collection VARCHAR(255),
  FOREIGN KEY (author_id) REFERENCES gallery_user(id)
);
CREATE TABLE gallery_tag (
  image_id VARCHAR(255) NOT NULL,
  tag VARCHAR(255) NOT NULL,
  FOREIGN KEY (image_id) REFERENCES gallery_image(id)
);
SELECT
  *
FROM
  gallery_image;
SELECT
  *
FROM
  gallery_user;
SELECT
  *
FROM
  gallery_tag;
SELECT
  gallery_user.name,
  gallery_image.subtitle
FROM
  gallery_user
  INNER JOIN gallery_image ON gallery_user.id = gallery_image.author_id;
SELECT
  gallery_image.subtitle,
  gallery_tag.tag
FROM
  gallery_image
  INNER JOIN gallery_tag ON gallery_image.id = gallery_tag.image_id;
DROP TABLE gallery_tag;
DROP TABLE gallery_image;
DROP TABLE gallery_user;