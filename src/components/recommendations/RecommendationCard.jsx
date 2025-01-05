import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Button,
    Chip,
    Stack,
    Avatar
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const RecommendationCard = ({ user, onSendRequest }) => (
    <Card sx={{ mb: 2 }}>
        <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
                <Avatar>{user.name[0]}</Avatar>
                <Stack flex={1}>
                    <Typography variant="h6">{user.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {user.mutualFriendsCount} mutual friends
                    </Typography>
                </Stack>
                <Button
                    variant="outlined"
                    startIcon={<PersonAddIcon />}
                    onClick={() => onSendRequest(user._id)}
                >
                    Add Friend
                </Button>
            </Stack>
            
            {user.interests?.length > 0 && (
                <Stack direction="row" spacing={1} mt={2}>
                    {user.interests.map(interest => (
                        <Chip
                            key={interest}
                            label={interest}
                            size="small"
                            variant="outlined"
                        />
                    ))}
                </Stack>
            )}
        </CardContent>
    </Card>
);

export default RecommendationCard;