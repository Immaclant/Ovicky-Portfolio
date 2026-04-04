import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function OutlinedCard() {
  return (
    <Card className="card">
      <CardMedia
        className="card-img"
        sx={{ height: 200 }}
        image="https://plus.unsplash.com/premium_photo-1683141243517-5730698ff67f?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Book-img"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Publications
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          How europe Underdeveloped Africa
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View More</Button>
      </CardActions>
    </Card>
  );
}
