"""Add notifies table

Revision ID: 0f2a8d871028
Revises: 426c974c73bd
Create Date: 2024-03-23 11:36:53.343707

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0f2a8d871028'
down_revision: Union[str, None] = '426c974c73bd'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
