import React, { useRef } from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

function TagCheckBox(props) {
  const [tags, setTags] = React.useState([]);

  const handleDelete = (tagToDelete) => () => {
    setTags((tag) => tag.filter((tag) => tag.key !== tagToDelete.key));
  };

  const tagInputRef = useRef(null);

  const { getTags } = props;

  function addTag() {
    var tagInput = tagInputRef.current.value;
    setTags([...tags, tagInput]);
    getTags([...tags, tagInput]);
    tagInputRef.current.value = null;
  }

  return (
    <div>
      <Box>
        <Typography>Add tags</Typography>

        {tags ? (
          <Box
            sx={{
              listStyle: "none",
              display: "flex",
              mb: 2,
            }}
            component="ul"
          >
            {tags.map((tag, index) => {
              let icon;

              return (
                <ListItem sx={{ mb: 2 }} id={index} key={index}>
                  <Chip icon={icon} label={tag} onDelete={handleDelete(tag)} />
                  <input
                    name="category"
                    style={{ display: "none" }}
                    value={tag}
                  ></input>
                </ListItem>
              );
            })}
          </Box>
        ) : (
          <Typography></Typography>
        )}
        <Box>
          <TextField
            id="tags"
            label="Tags"
            name="tags"
            placeholder="tag"
            color="secondary"
            focused
            sx={{ width: 3 / 4, mr: 2, mb: 1 }}
            inputRef={tagInputRef}
          />
          <br></br>
          <Button
            variant="contained"
            sx={{ backgroundColor: "purple" }}
            type="button"
            onClick={() => addTag()}
          >
            Add
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default TagCheckBox;
