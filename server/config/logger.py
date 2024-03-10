from logging.config import dictConfig
import logging
from schemas.logconfig import LogConfig

dictConfig(LogConfig().model_dump())
logger = logging.getLogger("server")
