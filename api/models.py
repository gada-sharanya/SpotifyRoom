from django.db import models
import string
import random


def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break

    return code


class Room(models.Model):
    code = models.CharField(
        max_length=8, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    current_song = models.CharField(max_length=50, null=True)


    def __str__(self):
        return (
            f"Room: {self.code}\n"
            f"Host: {self.host}\n"
            f"Guests Can Pause: {self.guest_can_pause}\n"
            f"Votes to Skip: {self.votes_to_skip}\n"
            f"Created At: {self.created_at}\n"
            f"Current Song: {self.current_song}"
        )


